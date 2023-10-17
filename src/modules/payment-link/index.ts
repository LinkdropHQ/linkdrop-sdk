import { ethers } from 'ethers'
import IPaymentLinkSDK, {
  TParseURL,
  TGetCurrentFee,
  TGetDepositAmount,
  TRedeem,
  TUpdateAmount,
  TConstructorArgs,
  TDepositWithAuthorization,
  TGetNextTransferId,
  TGenerateClaimUrl,
  TDefineDomain
} from './types'
import { TEscrowPaymentDomain, TLink } from '../../types'
import {
  generateReceiverSig,
  decodeSenderAddress,
  getDepositAuthorization,
  getValidAfterAndValidBefore,
  generateLinkKeyandSignature
} from "../../utils"
import { linkApi } from '../../api'
import { mumbaiApiUrl, polygonApiUrl, baseApiUrl } from '../../configs'
import { decodeLink, encodeLink } from '../../helpers'
import { errors } from '../../texts'
import * as configs from '../../configs'

class PaymentLink implements IPaymentLinkSDK {
  sender: string
  token: string
  amount: string
  expiration: string
  chainId: number
  apiKey: string
  apiHost: string
  baseUrl: string
  escrowAddress: string
  transferId: string
  claimUrl: string

  constructor ({
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
    this.baseUrl = baseUrl || configs.baseUrl

    // add error handling
    if (this.chainId === 80001) {
      this.escrowAddress = mumbaiApiUrl
    } else if (this.chainId === 137) {
      this.escrowAddress = polygonApiUrl
    } else if (this.chainId === 8453) {
      this.escrowAddress = baseApiUrl
    }

    if (claimUrl) {
      this.claimUrl = claimUrl
    }
    this.transferId = transferId || this._getNextTransferId()
  }

  getCurrentFee: TGetCurrentFee = async (token) => {
    return '0'
  }

  getDepositAmount: TGetDepositAmount = async (link) => {
    const decodedLinkParams = await this._parseUrl(link)
    // const { transferId, sender } = decodedLinkParams
    // const { token, amount, expiration } = await this.escrow.getDeposit(sender, transferId)
    return { token: '', amount: '', expiration: '' }
  }

  redeem: TRedeem = async (dest) => {
    const decodedLinkParams = await this._parseUrl(this.claimUrl)
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
    const { data } = redeem
    return data.txHash
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
      throw new Error(errors.property_not_provided('transferId'))
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
    const auth = await getDepositAuthorization(
      signTypedData,
      this.sender,
      this.escrowAddress,
      this.amount,
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
        this.amount,
        auth
      )
      const { data } = result
      return data.txHash
    }
  }

  _parseUrl: TParseURL = async (link) => {
    const decodedLink = decodeLink(link)
    const linkKeyId = (new ethers.Wallet(decodedLink.linkKey)).address
    const escrowPaymentDomain: TEscrowPaymentDomain = {
      name: "LinkdropEscrow",
      version: "1",
      chainId: this.chainId,
      verifyingContract: this.escrowAddress,
    }

    const sender = decodeSenderAddress(
      linkKeyId,
      decodedLink.transferId,
      decodedLink.senderSig,
      escrowPaymentDomain
    )
    return {
      senderSig: decodedLink.senderSig,
      linkKey: decodedLink.linkKey,
      transferId: decodedLink.transferId,
      sender
    }
  }

  updateAmount: TUpdateAmount = (amount) => {
    return {
      amount,
      fee: '0',
      totalAmount: '0'
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
    
    const escrowPaymentDomain: TEscrowPaymentDomain = {
      name: "LinkdropEscrow",
      version: "1",
      chainId: this.chainId,
      verifyingContract: this.escrowAddress,
    }

    const result = await generateLinkKeyandSignature(
      signTypedData,
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
        claimUrl: encodeLink(this.baseUrl, linkParams),
        transferId: this.transferId
      }
    }
  }
}
export default PaymentLink
