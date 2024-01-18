import IClaimLinkSDK, {
  TGetCurrentFee,
  TRedeem,
  TUpdateAmount,
  TConstructorArgs,
  TDepositWithAuthorization,
  TGenerateClaimUrl,
  TDefineDomain,
  TGetStatus,
  TDeposit,
  TDefineValue,
  TDepositERC20,
  TDepositNative,
  TDepositERC721,
  TDepositERC1155
} from './types'
import { toBigInt } from 'ethers'
import {
  TEscrowPaymentDomain,
  TLink,
  ETokenType,
  TClaimLinkItemOperation,
  TGetRandomBytes
} from '../../types'
import { ValidationError } from '../../errors'
import { LinkdropEscrowToken, LinkdropEscrowNFT } from '../../abi'
import {
  generateReceiverSig,
  getDepositAuthorization,
  getValidAfterAndValidBefore,
  generateLinkKeyandSignature,
  decodeSenderAddress
} from "../../utils"
import { linkApi } from '../../api'
import {
  defineEscrowAddress,
  defineIfEscrowAddressIsCorrect,
  encodeLink,
  parseLink,
  updateOperations,
  defineDomain
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
  apiUrl: string
  baseUrl: string
  escrowAddress: string | null
  getRandomBytes: TGetRandomBytes
  transferId: string
  claimUrl: string
  tokenType: ETokenType
  operations: TClaimLinkItemOperation[]
  linkKey: string | null
  deposited: boolean = false

  tokenId: string

  feeAuthorization: string
  amount: string
  totalAmount: string
  feeAmount: string
  feeToken: string

  forRecipient: boolean


  constructor({
    sender,
    token,
    amount,
    feeAmount,
    totalAmount,
    expiration,
    chainId,
    apiUrl,
    baseUrl,
    apiKey,
    transferId,
    tokenType,
    escrowAddress,
    operations,
    linkKey,
    getRandomBytes,
    feeAuthorization,
    feeToken,
    claimUrl,
    tokenId,
    forRecipient
  }: TConstructorArgs) {

    this.getRandomBytes = getRandomBytes

    if (!sender) {
      throw new ValidationError(errors.argument_not_provided('sender'))
    }

    this.forRecipient = Boolean(forRecipient)

    if (tokenType === 'ERC721' || tokenType === 'ERC1155') {
      if (!tokenId) {
        throw new ValidationError(errors.argument_not_provided('tokenId'))
      }
      this.tokenId = tokenId
    }

    this.sender = sender.toLowerCase()
    this.feeAmount = feeAmount
    this.totalAmount = totalAmount
    if (feeAuthorization) {
      this.feeAuthorization = feeAuthorization
    }
    if (feeToken) {
      this.feeToken = feeToken.toLowerCase()
    }
    if (tokenType !== 'ERC721' && !amount) {
      throw new ValidationError(errors.argument_not_provided('amount'))
    } else {
      this.amount = amount
    }
    this.operations = operations || []
    this.expiration = expiration
    if (!chainId) {
      throw new ValidationError(errors.argument_not_provided('chainId'))
    }
    this.chainId = chainId
    this.apiUrl = apiUrl
    this.#apiKey = apiKey
    if (!tokenType) {
      throw new ValidationError(errors.argument_not_provided('tokenType'))
    }
    this.tokenType = tokenType

    if (tokenType === 'NATIVE') {
      this.token = configs.nativeTokenAddress
    } else {
      if (!token) {
        throw new ValidationError(errors.argument_not_provided('token'))
      }
      this.token = token.toLowerCase()
    }

    this.escrowAddress = escrowAddress?.toLowerCase() || defineEscrowAddress(
      this.chainId,
      this.tokenType 
    )

    if (!this.escrowAddress) {
      throw new Error(errors.escrow_not_available(
        this.token,
        this.chainId
      ))
    }

    if (!defineIfEscrowAddressIsCorrect(
      this.chainId,
      this.escrowAddress,
      this.tokenType 
    )) {
      throw new Error(errors.escrow_is_not_correct())
    }

    if (!transferId) {
      throw new Error(errors.argument_not_provided('transferId'))
    }

    this.transferId = transferId.toLowerCase()

    if (linkKey) {
      this.linkKey = linkKey
    }

    if (claimUrl) {
      this.claimUrl = claimUrl
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
    const decodedLinkParams = parseLink(this.claimUrl)
    if (!decodedLinkParams) {
      throw new Error(errors.link_decode_failed())
    }
    const { senderSig, linkKey } = decodedLinkParams
    const receiverSig = await generateReceiverSig(linkKey, dest)
    if (senderSig) {
      const redeem = await linkApi.redeemRecoveredLink(
        this.apiUrl,
        this.#apiKey,
        dest,
        this.sender.toLowerCase(),
        this.escrowAddress,
        this.transferId,
        receiverSig,
        senderSig,
        this.token
      )
      const { tx_hash: txHash } = redeem
      return txHash
    } else {
      const redeem = await linkApi.redeemLink(
        this.apiUrl,
        this.#apiKey,
        dest,
        this.sender.toLowerCase(),
        this.escrowAddress,
        this.transferId,
        receiverSig,
        this.token
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
      this.apiUrl,
      this.#apiKey,
      this.transferId
    )

    return {
      status: claim_link.status,
      operations: updateOperations(claim_link.operations),
    }
  }

  _defineDomain: TDefineDomain = () => {
    return defineDomain(this.chainId, this.token)
  }
  
  _defineValue: TDefineValue = (
    tokenAddress,
    feeToken,
    totalAmount,
    feeAmount
  ) => {
    if (feeToken === tokenAddress && tokenAddress !== configs.nativeTokenAddress) {
      // stablecoin
      return '0'
    }
    if (tokenAddress === configs.nativeTokenAddress) {
      // native token
      return totalAmount
    }
  
    // erc20
    return feeAmount
  }

  _depositERC20: TDepositERC20 = async ({
    sendTransaction
  }) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }
    const iface = new ethers.Interface(LinkdropEscrowToken.abi)
    const data = iface.encodeFunctionData("deposit", [
      this.token,
      this.transferId,
      this.totalAmount,
      this.expiration,
      this.feeToken,
      this.feeAmount,
      this.feeAuthorization
    ])

    const value = this._defineValue(
      this.token,
      this.feeToken,
      this.totalAmount,
      this.feeAmount
    )

    const txHash = await this.sendTransaction({
      sendTransaction,
      data,
      value
    })

    await linkApi.deposit(
      this.apiUrl,
      this.#apiKey,
      this.token,
      this.tokenType,
      this.sender.toLowerCase(),
      this.escrowAddress as string,
      this.transferId,
      this.expiration,
      txHash,
      this.feeAuthorization,
      this.amount,
      this.feeAmount,
      this.totalAmount,
      this.feeToken
    )

    const linkParams: TLink = {
      linkKey: this.linkKey as string,
      transferId: this.transferId,
      chainId: this.chainId,
      sender: this.sender.toLowerCase()
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams
    )

    if (!claimUrl) {
      throw new Error(errors.not_possible_create_claim_url())
    }

    this.claimUrl = claimUrl
    this.deposited = true

    return {
      txHash,
      transferId: this.transferId,
      claimUrl
    }
  }

  _depositNative: TDepositNative = async ({
    sendTransaction
  }) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }
    const iface = new ethers.Interface(LinkdropEscrowToken.abi)
    const data = iface.encodeFunctionData("depositETH", [
      this.transferId,
      this.totalAmount,
      this.expiration,
      this.feeAmount,
      this.feeAuthorization
    ])

    const value = this._defineValue(
      this.token,
      this.feeToken,
      this.totalAmount,
      this.feeAmount
    )

    const txHash = await this.sendTransaction({
      sendTransaction,
      data,
      value
    })

    await linkApi.deposit(
      this.apiUrl,
      this.#apiKey,
      this.token,
      this.tokenType,
      this.sender.toLowerCase(),
      this.escrowAddress as string,
      this.transferId,
      this.expiration,
      txHash,
      this.feeAuthorization,
      this.amount,
      this.feeAmount,
      this.totalAmount,
      this.feeToken
    )

    const linkParams: TLink = {
      linkKey: this.linkKey as string,
      transferId: this.transferId,
      chainId: this.chainId,
      sender: this.sender.toLowerCase()
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams
    )

    if (!claimUrl) {
      throw new Error(errors.not_possible_create_claim_url())
    }

    this.claimUrl = claimUrl
    this.deposited = true

    return {
      txHash,
      transferId: this.transferId,
      claimUrl
    }
  }

  _depositERC1155: TDepositERC1155 = async ({
    sendTransaction
  }) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }
    const iface = new ethers.Interface(LinkdropEscrowNFT.abi)
    const data = iface.encodeFunctionData("depositERC1155", [
      this.token,
      this.transferId,
      this.tokenId,
      this.amount,
      this.expiration,
      this.feeAmount,
      this.feeAuthorization
    ])

    const value = this._defineValue(
      this.token,
      this.feeToken,
      this.totalAmount,
      this.feeAmount
    )

    const txHash = await this.sendTransaction({
      sendTransaction,
      data,
      value
    })

    await linkApi.depositERC1155(
      this.apiUrl,
      this.#apiKey,
      this.token,
      this.tokenType,
      this.sender.toLowerCase(),
      this.escrowAddress as string,
      this.transferId,
      this.expiration,
      txHash,
      this.feeAuthorization,
      this.tokenId,
      this.amount,
      this.feeAmount,
      this.totalAmount,
      this.feeToken
    )

    const linkParams: TLink = {
      linkKey: this.linkKey as string,
      transferId: this.transferId,
      chainId: this.chainId,
      sender: this.sender.toLowerCase()
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams
    )

    if (!claimUrl) {
      throw new Error(errors.not_possible_create_claim_url())
    }

    this.claimUrl = claimUrl
    this.deposited = true

    return {
      txHash,
      transferId: this.transferId,
      claimUrl
    }
  }

  _depositERC721: TDepositERC721 = async ({
    sendTransaction
  }) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }
    const iface = new ethers.Interface(LinkdropEscrowNFT.abi)
    const data = iface.encodeFunctionData("depositERC721", [
      this.token,
      this.transferId,
      this.tokenId,
      this.expiration,
      this.feeAmount,
      this.feeAuthorization
    ])

    const value = this._defineValue(
      this.token,
      this.feeToken,
      this.totalAmount,
      this.feeAmount
    )

    const txHash = await this.sendTransaction({
      sendTransaction,
      data,
      value
    })

    await linkApi.depositERC721(
      this.apiUrl,
      this.#apiKey,
      this.token,
      this.tokenType,
      this.sender.toLowerCase(),
      this.escrowAddress as string,
      this.transferId,
      this.expiration,
      txHash,
      this.feeAuthorization,
      this.tokenId,
      this.feeAmount,
      this.totalAmount,
      this.feeToken
    )

    const linkParams: TLink = {
      linkKey: this.linkKey as string,
      transferId: this.transferId,
      chainId: this.chainId,
      sender: this.sender.toLowerCase()
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams
    )

    if (!claimUrl) {
      throw new Error(errors.not_possible_create_claim_url())
    }

    this.claimUrl = claimUrl
    this.deposited = true

    return {
      txHash,
      transferId: this.transferId,
      claimUrl
    }
  }

  sendTransaction = async ({
    sendTransaction,
    data,
    value
  }) => {
    const { hash: txHash } = await sendTransaction({
      to: this.escrowAddress,
      value,
      data
    })
    return txHash
  }

  deposit: TDeposit = async ({
    sendTransaction
  }) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }

    if (!this.linkKey) {
      throw new Error(errors.cannot_deposit_after_retrieve())
    }

    if (this.deposited) {
      throw new Error(errors.cannot_deposit_twice())
    }

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

    if (this.tokenType === 'NATIVE') {
      return this._depositNative({
        sendTransaction
      })
    } else if (this.tokenType === 'ERC20') {
      return this._depositERC20({
        sendTransaction
      })
    } else if (this.tokenType === 'ERC721') {
      return this._depositERC721({
        sendTransaction
      })
    } else {
      return this._depositERC1155({
        sendTransaction
      })
    }
    
  }

  depositWithAuthorization: TDepositWithAuthorization = async ({
    signTypedData
  }) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }
    const authSelector = configs.supportedStableCoins[this.token]

    if (!authSelector) {
      throw new ValidationError(errors.stable_token_not_supported(this.token))
    }

    if (!this.linkKey) {
      throw new Error(errors.cannot_deposit_after_retrieve())
    }

    if (this.deposited) {
      throw new Error(errors.cannot_deposit_twice())
    }

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

    const authResult = await getDepositAuthorization(
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
      this.token,
      this.feeAmount
    )

    const result = await linkApi.depositWithAuthorization(
      this.apiUrl,
      this.#apiKey,
      this.token,
      this.tokenType,
      this.sender.toLowerCase(),
      this.escrowAddress,
      this.transferId,
      this.expiration,
      authResult,
      authSelector,
      this.feeAuthorization,
      this.amount,
      this.feeAmount,
      this.totalAmount
    )

    const { tx_hash } = result

    const linkParams: TLink = {
      linkKey: this.linkKey,
      transferId: this.transferId,
      chainId: this.chainId,
      sender: this.sender.toLowerCase()
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams
    )

    if (!claimUrl) {
      throw new Error(errors.not_possible_create_claim_url())
    }

    this.claimUrl = claimUrl
    this.deposited = true

    return {
      txHash: tx_hash,
      claimUrl: this.claimUrl,
      transferId: this.transferId
    }
  }

  _getCurrentFee: TGetCurrentFee = async (newAmount) => {
    const result = await linkApi.getFee(
      this.apiUrl,
      this.#apiKey,
      this.token,
      this.sender.toLowerCase(),
      this.tokenType,
      this.transferId,
      this.expiration,
      newAmount,
      this.tokenId
    )

    return result
  }

  updateAmount: TUpdateAmount = async (amount) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }
    if (this.tokenType === 'ERC721') {
      throw new ValidationError(errors.cannot_update_amount_for_erc721())
    }
    const {
      fee_amount: feeAmount,
      total_amount: totalAmount,
      min_transfer_amount: minTransferAmount,
      max_transfer_amount: maxTransferAmount,
      fee_authorization: feeAuthorization,
      fee_token: feeToken
    } = await this._getCurrentFee(
      amount as string
    )

    if (toBigInt(amount) < toBigInt(minTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_more_than_minlimit(minTransferAmount.toString()))
    }

    if (toBigInt(amount) > toBigInt(maxTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_less_than_maxlimit(maxTransferAmount.toString()))
    }

    if (!this.linkKey) {
      const statusData = await this.getStatus()
      if (statusData.status === 'created') {
        this.amount = amount
        this.feeAmount = feeAmount
        this.totalAmount = totalAmount
        this.feeAuthorization = feeAuthorization
        this.feeToken = feeToken.toLowerCase()

        return {
          amount,
          feeAmount,
          totalAmount,
          feeToken
        }
      } else {
        throw new Error(errors.cannot_update_amount())
      }
    }

    if (this.deposited) {
      throw new Error(errors.cannot_update_amount())
    }

    this.amount = amount
    this.feeAmount = feeAmount
    this.totalAmount = totalAmount
    this.feeAuthorization = feeAuthorization
    this.feeToken = feeToken.toLowerCase()

    return {
      amount,
      feeAmount,
      totalAmount,
      feeToken
    }
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
      version: "3",
      chainId: this.chainId,
      verifyingContract: this.escrowAddress,
    }

    return escrowPaymentDomain
  }

  generateClaimUrl: TGenerateClaimUrl = async ({
    signTypedData
  }) => {
    if (this.forRecipient) {
      throw new Error(errors.link_only_for_claim())
    }
    if (!this.getRandomBytes) {
      throw new Error(errors.property_not_provided('getRandomBytes'))
    }

    if (!signTypedData) {
      throw new ValidationError(errors.argument_not_provided('signTypedData'))
    }

    if (!this.transferId) {
      throw new Error(errors.property_not_provided('transferId'))
    }

    const escrowPaymentDomain = this._getEscrowPaymentDomain()

    const result = await generateLinkKeyandSignature(
      signTypedData,
      this.getRandomBytes,
      this.transferId,
      escrowPaymentDomain
    )

    const senderAddress = decodeSenderAddress(
      result.linkKeyId,
      this.transferId,
      result.senderSig,
      escrowPaymentDomain
    )

    if (senderAddress.toLowerCase() !== this.sender.toLowerCase()) {
      throw new Error(errors.only_original_sender_can_generate_url())
    }

    const { linkKey, senderSig } = result

    const linkParams: TLink = {
      linkKey,
      senderSig,
      transferId: this.transferId,
      chainId: this.chainId
    }

    const claimUrl = encodeLink(
      this.baseUrl,
      linkParams
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
