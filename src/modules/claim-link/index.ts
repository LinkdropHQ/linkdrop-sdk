import IClaimLinkSDK, {
  TGetCurrentFee,
  TRedeem,
  TUpdateAmount,
  TConstructorArgs,
  TDepositWithAuthorization,
  TGetNextTransferId,
  TGenerateClaimUrl,
  TDefineDomain,
  TGetStatus
} from './types'
import { TEscrowPaymentDomain, TLink } from '../../types'
import {
  generateReceiverSig,
  getDepositAuthorization,
  getValidAfterAndValidBefore,
  generateLinkKeyandSignature
} from "../../utils"
import { linkApi } from '../../api'
import { defineEscrowAddress, encodeLink, parseLink } from '../../helpers'
import { errors } from '../../texts'
import * as configs from '../../configs'

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
    claimUrl
  }: TConstructorArgs) {
    this.sender = sender
    this.token = token
    this.amount = amount
    this.expiration = expiration
    this.chainId = chainId
    this.apiHost = apiHost
    this.apiKey = apiKey

    // add error handling
    this.escrowAddress = String(defineEscrowAddress(this.chainId))

    if (claimUrl) {
      this.claimUrl = claimUrl
    }

    if (transferId) {
      this.transferId = transferId
    }
    this.baseUrl = baseUrl || configs.baseUrl
  }

  redeem: TRedeem = async (dest) => {
    const decodedLinkParams = await parseLink(
      this.chainId,
      this.escrowAddress,
      this.claimUrl
    )
    const { senderSig, linkKey, transferId, sender } = decodedLinkParams
    const receiverSig = await generateReceiverSig(linkKey, dest)
    const redeem = await linkApi.redeemLink(
      this.apiHost,
      this.apiKey,
      dest,
      sender,
      this.escrowAddress,
      transferId,
      receiverSig,
      senderSig
    )
    const { txHash } = redeem
    return txHash
  }

  getStatus: TGetStatus = async () => {
    if (!this.transferId) {
      throw new Error(errors.property_not_provided('transferId'))
    }

    const { escrow_payment } = await linkApi.getTransferStatus(
      this.apiHost,
      this.apiKey,
      this.sender,
      this.transferId
    )

    return {
      status: escrow_payment.status,
      operations: escrow_payment.operations
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

  depositWithAuthorization: TDepositWithAuthorization = async ({
    signTypedData
  }) => {
    const domain = this._defineDomain()
    if (!domain) {
      throw new Error(errors.chain_not_supported())
    }

    const [validAfter, validBefore] = getValidAfterAndValidBefore()
    if (!this.escrowAddress) {
      throw new Error(errors.property_not_provided('escrowAddress'))
    }
    if (!this.transferId) {
      this.transferId = this._getNextTransferId()
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

    const {
      total_amount: totalAmount
    } = await this._getCurrentFee(this.amount)

    const auth = await getDepositAuthorization(
      signTypedData,
      this.sender,
      this.escrowAddress,
      totalAmount,
      validAfter,
      validBefore,
      this.transferId,
      this.expiration,
      domain,
      this.chainId
    )

    if (auth) {
      const result = await linkApi.deposit(
        this.apiHost,
        this.apiKey,
        this.sender,
        this.escrowAddress,
        this.transferId,
        this.expiration,
        totalAmount,
        auth
      )
      const { txHash } = result
      return txHash
    }
  }

  _getCurrentFee: TGetCurrentFee = async (newAmount) => {
    // const result = await linkApi.getFee(
    //   this.apiHost,
    //   this.apiKey,
    //   newAmount,
    //   this.token,
    //   this.sender
    // )
    const result = { fee: "0", total_amount: newAmount, amount: newAmount }
    return Promise.resolve(result)
  }

  updateAmount: TUpdateAmount = async (amount) => {
    if (!this.transferId) {
      const {
        fee,
        total_amount: totalAmount
      } = await this._getCurrentFee(amount)

      this.amount = amount

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

    const escrowPaymentDomain: TEscrowPaymentDomain = {
      name: "LinkdropEscrow",
      version: "1",
      chainId: this.chainId,
      verifyingContract: this.escrowAddress,
    }

    const result = await generateLinkKeyandSignature(
      signTypedData,
      getRandomBytes,
      this.transferId,
      escrowPaymentDomain
    )
    if (result) {
      const { linkKey, linkKeyId, senderSig } = result
      const linkParams: TLink = {
        linkKey,
        senderSig,
        transferId: this.transferId,
        chainId: this.chainId
      }

      this.claimUrl = encodeLink(this.baseUrl, linkParams)

      return {
        claimUrl: this.claimUrl,
        transferId: this.transferId
      }
    }
  }
}
export default ClaimLink
