import IClaimLinkSDK, {
  TGetCurrentFee,
  TRedeem,
  TUpdateAmount,
  TConstructorArgs,
  TDepositWithAuthorization,
  TGetNextTransferId,
  TGenerateClaimUrl,
  TDefineDomain,
  TGetStatus,
  TDeposit,
  TInitialize
} from './types'
import { TEscrowPaymentDomain, TLink, TTokenType } from '../../types'
import { LinkdropEscrowNetworkToken } from '../../abi'
import {
  generateReceiverSig,
  getDepositAuthorization,
  getValidAfterAndValidBefore,
  generateLinkKeyandSignature,
  generateKeypair
} from "../../utils"
import { linkApi } from '../../api'
import { defineEscrowAddress, encodeLink, parseLink } from '../../helpers'
import { errors } from '../../texts'
import * as configs from '../../configs'
import { ethers } from 'ethers'

class ClaimLink implements IClaimLinkSDK {
  sender: string
  token: string
  expiration: string
  chainId: number
  apiKey: string
  apiHost: string
  baseUrl: string
  escrowAddress: string
  transferId: string
  claimUrl: string
  amount: string
  totalAmount: string
  fee: string
  tokenType: TTokenType

  constructor({
    sender,
    token,
    amount,
    expiration,
    chainId,
    apiHost,
    baseUrl,
    apiKey,
    transferId,
    claimUrl,
    tokenType
  }: TConstructorArgs) {
    this.sender = sender.toLowerCase()
    this.token = token
    this.amount = amount
    this.expiration = expiration
    this.chainId = chainId
    this.apiHost = apiHost
    this.apiKey = apiKey
    this.tokenType = tokenType

    // add error handling
    this.escrowAddress = String(defineEscrowAddress(this.chainId, tokenType))

    if (claimUrl) {
      this.claimUrl = claimUrl
    }

    if (transferId) {
      this.transferId = transferId.toLowerCase()
    }

    this.baseUrl = baseUrl || configs.baseUrl
  }

  redeem: TRedeem = async (dest) => {
    const decodedLinkParams = await parseLink(
      this.chainId,
      this.escrowAddress,
      this.claimUrl
    )
    if (!decodedLinkParams) {
      throw new Error(errors.link_decode_failed())
    }
    const { senderSig, linkKey, transferId, sender } = decodedLinkParams
    const receiverSig = await generateReceiverSig(linkKey, dest)
    if (senderSig) {
      const redeem = await linkApi.redeemRecoveredLink(
        this.apiHost,
        this.apiKey,
        dest,
        sender.toLowerCase(),
        this.escrowAddress,
        transferId,
        receiverSig,
        senderSig
      )
      const { tx_hash: txHash } = redeem
      return txHash
    } else {
      const redeem = await linkApi.redeemLink(
        this.apiHost,
        this.apiKey,
        dest,
        sender.toLowerCase(),
        this.escrowAddress,
        transferId,
        receiverSig
      )
      const { tx_hash: txHash } = redeem
      return txHash
    }
  }

  getStatus: TGetStatus = async () => {
    if (!this.transferId) {
      throw new Error(errors.property_not_provided('transferId'))
    }

    const { claim_link } = await linkApi.getTransferStatus(
      this.apiHost,
      this.apiKey,
      this.sender.toLowerCase(),
      this.transferId
    )

    return {
      status: claim_link.status,
      operations: claim_link.operations
    }
  }

  _defineDomain: TDefineDomain = () => {
    if (this.chainId === 137) {
      return {
        name: 'USD Coin (PoS)',  // Polygon Mainnet
        version: '1',
        verifyingContract: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        salt: '0x0000000000000000000000000000000000000000000000000000000000000089'
      }
    }

    if (this.chainId === 80001) { // Mumbai
      return {
        name: 'USD Coin (PoS)',
        version: '1',
        verifyingContract: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881'
      }
    } else if (this.chainId === 8453) { // Base
      return {
        name: 'USD Coin',
        version: '2',
        chainId: 8453,
        verifyingContract: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
      }
    }

    return null
  }

  initialize: TInitialize = async () => {
    const {
      total_amount: totalAmount,
      fee
    } = await this._getCurrentFee(this.amount)
    this.totalAmount = totalAmount
    this.fee = fee
  }

  deposit: TDeposit = async ({
    sendTransaction,
    getRandomBytes
  }) => {

    const [validAfter, validBefore] = getValidAfterAndValidBefore()

    if (!this.escrowAddress) {
      throw new Error(errors.property_not_provided('escrowAddress'))
    }

    if (!this.expiration) {
      throw new Error(errors.property_not_provided('expiration'))
    }
    if (!this.amount) {
      throw new Error(errors.property_not_provided('amount'))
    }
    if (!sendTransaction) {
      throw new Error(errors.argument_not_provided('sendTransaction'))
    }

    const keypair = await generateKeypair(getRandomBytes)

    this.transferId = keypair.address.toLowerCase()

    const iface = new ethers.Interface(LinkdropEscrowNetworkToken.abi)

    const data = iface.encodeFunctionData("deposit", [
      this.transferId,
      this.expiration
    ])

    const { hash: txHash } = await sendTransaction({
      to: this.escrowAddress,
      value: this.totalAmount,
      // needs update
      gasLimit: 150000, // Ensure you have enough gas
      // needs update
      data
    })

    const result = await linkApi.deposit(
      this.apiHost,
      this.apiKey,
      this.token,
      this.tokenType,
      this.sender.toLowerCase(),
      this.escrowAddress,
      this.transferId,
      this.expiration,
      this.totalAmount,
      txHash
    )
    if (result) {
      const linkParams: TLink = {
        linkKey: keypair.privateKey,
        transferId: this.transferId,
        chainId: this.chainId,
        tokenType: this.tokenType,
        sender: this.sender.toLowerCase()
      }

      const claimUrl = encodeLink(this.baseUrl, linkParams)

      if (!claimUrl) {
        throw new Error(errors.not_possible_create_claim_url())
      }

      this.claimUrl = claimUrl

      return {
        txHash,
        transferId: this.transferId,
        claimUrl
      }
    }
  }

  depositWithAuthorization: TDepositWithAuthorization = async ({
    signTypedData,
    getRandomBytes
  }) => {

    if (this.tokenType === 'NATIVE') {
      throw new Error(errors.deploy_with_auth_wrong_type())
    }

    const domain = this._defineDomain()
    if (!domain) {
      throw new Error(errors.chain_not_supported())
    }

    const [validAfter, validBefore] = getValidAfterAndValidBefore()
    if (!this.escrowAddress) {
      throw new Error(errors.property_not_provided('escrowAddress'))
    }

    if (!this.expiration) {
      throw new Error(errors.property_not_provided('expiration'))
    }
    if (!this.amount) {
      throw new Error(errors.property_not_provided('amount'))
    }
    if (!signTypedData) {
      throw new Error(errors.argument_not_provided('signTypedData'))
    }

    const keypair = await generateKeypair(getRandomBytes)

    this.transferId = keypair.address.toLowerCase()

    const auth = await getDepositAuthorization(
      signTypedData,
      this.sender.toLowerCase(),
      this.escrowAddress,
      this.totalAmount,
      validAfter,
      validBefore,
      this.transferId,
      this.expiration,
      domain,
      this.chainId
    )

    if (auth) {
      const result = await linkApi.depositWithAuthorization(
        this.apiHost,
        this.apiKey,
        this.token,
        this.tokenType,
        this.sender.toLowerCase(),
        this.escrowAddress,
        this.transferId,
        this.expiration,
        this.totalAmount,
        auth
      )

      const { tx_hash } = result

      const linkParams: TLink = {
        linkKey: keypair.privateKey,
        transferId: this.transferId,
        chainId: this.chainId,
        tokenType: this.tokenType,
        sender: this.sender.toLowerCase()
      }

      const claimUrl = encodeLink(this.baseUrl, linkParams)

      if (!claimUrl) {
        throw new Error(errors.not_possible_create_claim_url())
      }

      this.claimUrl = claimUrl

      return {
        txHash: tx_hash,
        claimUrl: this.claimUrl,
        transferId: this.transferId
      }
    }
  }

  _getCurrentFee: TGetCurrentFee = async (newAmount) => {
    const result = await linkApi.getFee(
      this.apiHost,
      this.apiKey,
      newAmount,
      this.token,
      this.sender.toLowerCase()
    )

    return result
  }

  updateAmount: TUpdateAmount = async (amount) => {
    if (!this.transferId) {
      const {
        fee,
        total_amount: totalAmount
      } = await this._getCurrentFee(amount)

      this.amount = amount
      this.fee = fee
      this.totalAmount = totalAmount

      return {
        amount,
        fee,
        totalAmount
      }
    }
    const statusData = await this.getStatus()
    if (statusData) {
      if (statusData.status === 'created') {
        const {
          fee,
          total_amount: totalAmount
        } = await this._getCurrentFee(amount)

        this.amount = amount
        this.fee = fee
        this.totalAmount = totalAmount

        return {
          amount,
          fee,
          totalAmount
        }
      } else {
        throw new Error(errors.cannot_update_amount())
      }
    }
  }

  _getNextTransferId: TGetNextTransferId = () => {
    return String(+new Date())
  }

  _getEscrowPaymentDomain = () => {
    const escrowPaymentDomain: TEscrowPaymentDomain = {
      name: "LinkdropEscrow",
      version: "2",
      chainId: this.chainId,
      verifyingContract: this.escrowAddress,
    }

    return escrowPaymentDomain
  }

  generateClaimUrl: TGenerateClaimUrl = async ({
    getRandomBytes,
    signTypedData
  }) => {
    if (!getRandomBytes) {
      throw new Error(errors.argument_not_provided('getRandomBytes'))
    }

    if (!signTypedData) {
      throw new Error(errors.argument_not_provided('signTypedData'))
    }

    if (!this.transferId) {
      throw new Error(errors.property_not_provided('transferId'))
    }

    const escrowPaymentDomain = this._getEscrowPaymentDomain()

    const result = await generateLinkKeyandSignature(
      signTypedData,
      getRandomBytes,
      this.transferId,
      escrowPaymentDomain
    )

    if (result) {
      const { linkKey, senderSig } = result

      const linkParams: TLink = {
        linkKey,
        senderSig,
        transferId: this.transferId,
        chainId: this.chainId,
        tokenType: this.tokenType
      }

      const claimUrl = encodeLink(this.baseUrl, linkParams)

      if (!claimUrl) {
        throw new Error(errors.not_possible_create_claim_url())
      }

      this.claimUrl = claimUrl

      return {
        claimUrl: this.claimUrl,
        transferId: this.transferId
      }
    }
  }
}
export default ClaimLink
