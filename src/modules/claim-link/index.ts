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
import { toBigInt } from 'ethers'
import {
  TEscrowPaymentDomain,
  TLink,
  TTokenType,
  ETokenAddress,
  TClaimLinkItemOperation,
  TGetRandomBytes
} from '../../types'
import { ValidationError } from '../../errors'
import { LinkdropEscrowNetworkToken } from '../../abi'
import {
  generateReceiverSig,
  getDepositAuthorization,
  getValidAfterAndValidBefore,
  generateLinkKeyandSignature,
  generateKeypair
} from "../../utils"
import { linkApi } from '../../api'
import {
  defineEscrowAddress,
  defineIfEscrowAddressIsCorrect,
  encodeLink,
  parseLink,
  updateOperations
} from '../../helpers'
import { errors } from '../../texts'
import * as configs from '../../configs'
import { ethers } from 'ethers'

class ClaimLink implements IClaimLinkSDK {
  sender: string
  token: string
  expiration: number
  chainId: number
  #apiKey: string | null
  apiHost: string
  baseUrl: string
  escrowAddress: string | null
  transferId: string
  claimUrl: string
  amount: string
  totalAmount: string
  fee: string
  getRandomBytes: TGetRandomBytes
  tokenType: TTokenType
  operations: TClaimLinkItemOperation[]

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
    tokenType,
    escrowAddress,
    operations,
    getRandomBytes
  }: TConstructorArgs) {
    if (!sender) {
      throw new ValidationError(errors.argument_not_provided('sender'))
    }
    this.sender = sender.toLowerCase()
    if (!amount) {
      throw new ValidationError(errors.argument_not_provided('amount'))
    }

    if (getRandomBytes) {
      this.getRandomBytes = getRandomBytes
    }

    this.operations = operations || []
    this.amount = amount
    this.expiration = expiration || Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30)
    if (!chainId) {
      throw new ValidationError(errors.argument_not_provided('chainId'))
    }
    this.chainId = chainId
    this.apiHost = apiHost
    this.#apiKey = apiKey
    if (!tokenType) {
      throw new ValidationError(errors.argument_not_provided('tokenType'))
    }
    this.tokenType = tokenType

    if (tokenType === 'ERC20') {
      if (!token) {
        throw new ValidationError(errors.argument_not_provided('token'))
      }
      this.token = token.toLowerCase()
    } else {
      this.token = configs.nativeTokenAddress
    }

    this.escrowAddress = escrowAddress || defineEscrowAddress(
      this.chainId,
      this.token
    )

    if (!this.escrowAddress) {
      throw new Error(errors.escrow_not_available(
        this.token,
        this.chainId
      ))
    }

    if (!defineIfEscrowAddressIsCorrect(
      this.chainId,
      this.escrowAddress
    )) {
      throw new Error(errors.escrow_is_not_correct())
    }

    if (claimUrl) {
      this.claimUrl = claimUrl
    }

    if (transferId) {
      this.transferId = transferId.toLowerCase()
    }

    this.baseUrl = baseUrl || configs.baseUrl
  }

  redeem: TRedeem = async (dest) => {
    if (!dest) {
      throw new ValidationError(errors.argument_not_provided('dest'))
    }
    if (!this.escrowAddress) {
      throw new Error(errors.escrow_not_available(
        this.token,
        this.chainId
      ))
    }
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
        this.#apiKey,
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
        this.#apiKey,
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
      this.#apiKey,
      this.sender.toLowerCase(),
      this.transferId
    )

    return {
      status: claim_link.status,
      operations: updateOperations(claim_link.operations),
    }
  }

  _defineDomain: TDefineDomain = () => {
    if (this.chainId === 137) {
      if (this.token === ETokenAddress.usdcBridgedPolygon) {
        return {
          name: 'USD Coin (PoS)',  // Polygon Mainnet
          version: '1',
          verifyingContract: ETokenAddress.usdcBridgedPolygon,
          salt: '0x0000000000000000000000000000000000000000000000000000000000000089'
        }
      }

      return {
        "name": "USD Coin",
        "version": "2",
        "chainId": 137,
        "verifyingContract": ETokenAddress.usdcPolygon
      }
      
    }

    if (this.chainId === 84531) {// Base Goerli
      return {
        name: 'USD Coin',  
        version: '2',
        chainId: 84531,
        verifyingContract: ETokenAddress.usdcBaseGoerli
      }
    }

    if (this.chainId === 80001) { // Mumbai
      return {
        name: 'USD Coin (PoS)',
        version: '1',
        verifyingContract: ETokenAddress.usdcMumbai,
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881'
      }
    } 

    if (this.chainId === 8453) { // Base
      return {
        name: 'USD Coin',
        version: '2',
        chainId: 8453,
        verifyingContract: ETokenAddress.usdcBase
      }
    }

    return null
  }

  initialize: TInitialize = async () => {
    const {
      total_amount: totalAmount,
      fee,
      min_transfer_amount: minTransferAmount,
      max_transfer_amount: maxTransferAmount
    } = await this._getCurrentFee(this.amount)

    if (toBigInt(this.amount) < toBigInt(minTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_more_than_minlimit(minTransferAmount.toString()))
    }

    if (toBigInt(this.amount) > toBigInt(maxTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_less_than_maxlimit(maxTransferAmount.toString()))
    }

    this.totalAmount = totalAmount
    this.fee = fee
  }

  deposit: TDeposit = async ({
    sendTransaction,
    getRandomBytes
  }) => {

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
      throw new ValidationError(errors.argument_not_provided('sendTransaction'))
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
      this.#apiKey,
      this.token,
      this.tokenType,
      this.sender.toLowerCase(),
      this.escrowAddress,
      this.transferId,
      this.expiration,
      this.totalAmount,
      txHash
    )

    const linkParams: TLink = {
      linkKey: keypair.privateKey,
      transferId: this.transferId,
      chainId: this.chainId,
      tokenType: this.tokenType,
      sender: this.sender.toLowerCase()
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams,
      this.token
    )

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

  depositWithAuthorization: TDepositWithAuthorization = async ({
    signTypedData,
    getRandomBytes
  }) => {

    if (!signTypedData) {
      throw new ValidationError(errors.argument_not_provided('signTypedData'))
    }

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
      String(this.expiration),
      domain,
      this.chainId,
      this.token
    )

    const result = await linkApi.depositWithAuthorization(
      this.apiHost,
      this.#apiKey,
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

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams,
      this.token
    )

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

  _getCurrentFee: TGetCurrentFee = async (newAmount) => {
    const result = await linkApi.getFee(
      this.apiHost,
      this.#apiKey,
      newAmount,
      this.token,
      this.sender.toLowerCase(),
      this.tokenType
    )

    return result
  }

  updateAmount: TUpdateAmount = async (amount) => {
    const {
      fee,
      total_amount: totalAmount,
      min_transfer_amount: minTransferAmount,
      max_transfer_amount: maxTransferAmount
    } = await this._getCurrentFee(amount)

    if (toBigInt(amount) < toBigInt(minTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_more_than_minlimit(minTransferAmount.toString()))
    }

    if (toBigInt(amount) > toBigInt(maxTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_less_than_maxlimit(maxTransferAmount.toString()))
    }

    if (!this.transferId) {
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

  _getNextTransferId: TGetNextTransferId = () => {
    return String(+new Date())
  }

  _getEscrowPaymentDomain = () => {
    if (!this.escrowAddress) {
      throw new Error(errors.escrow_not_available(
        this.token,
        this.chainId
      ))
    }
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
      if (!this.getRandomBytes) {
        throw new ValidationError(errors.argument_not_provided('getRandomBytes'))
      }
    }

    const actualGetRandomBytesMethod = this.getRandomBytes || getRandomBytes

    if (!signTypedData) {
      throw new ValidationError(errors.argument_not_provided('signTypedData'))
    }

    if (!this.transferId) {
      throw new Error(errors.property_not_provided('transferId'))
    }

    const escrowPaymentDomain = this._getEscrowPaymentDomain()

    const result = await generateLinkKeyandSignature(
      signTypedData,
      actualGetRandomBytesMethod,
      this.transferId,
      escrowPaymentDomain
    )

    const { linkKey, senderSig } = result

    const linkParams: TLink = {
      linkKey,
      senderSig,
      transferId: this.transferId,
      chainId: this.chainId,
      tokenType: this.tokenType
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams,
      this.token
    )

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
export default ClaimLink
