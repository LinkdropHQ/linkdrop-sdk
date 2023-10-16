import { Signer, ethers } from 'ethers'
import IPaymentLinkSDK, {
  TGetApiHost,
  TParseURL,
  TGetCurrentFee,
  TGetDepositAmount,
  TRedeem,
  TInitialize,
  TUpdateAmount,
  TConstructorArgs,
  TDepositWithAuthorization,
  TGetNextTransferId,
  TGenerateClaimUrl,
  TDefineDomain
} from './types'
import { TEscrowPaymentDomain, TDomain } from '../../types'
import Linkdrop from '../linkdrop-pay-sdk'
import {
  generateReceiverSig,
  decodeSenderAddress,
  getDepositAuthorization,
  getValidAfterAndValidBefore,
  generateLinkKeyandSignature
} from "../../utils"
import { escrowABI } from '../../abi'
import { mumbaiEscrowAddress, polygonEscrowAddress, baseEscrowAddress } from '../../configs'
import { linkApi } from '../../api'
import { mumbaiApiUrl, polygonApiUrl, baseApiUrl } from '../../configs'
import { decodeLink, defineApiHost, encodeLink } from '../../helpers'
import { errors } from '../../texts'
import * as configs from '../../configs'

class PaymentLink implements IPaymentLinkSDK {
  sender: string
  token: string
  amount: string
  expiration: string
  chainId: number
  apiHost: string
  baseUrl: string

  constructor ({
    sender,
    token,
    amount,
    expiration,
    chainId,
    apiHost,
    baseUrl
  }: TConstructorArgs) {
    this.sender = sender
    this.token = token
    this.amount = amount
    this.expiration = expiration
    this.chainId = chainId
    this.apiHost = apiHost
    this.baseUrl = baseUrl || configs.baseUrl
  }

  initialize: TInitialize = async () => {
    // if (this.chainId === 80001) {
    //   // this.escrow = new ethers.Contract(mumbaiEscrowAddress, escrowABI, this.signer)
    //   return mumbaiApiUrl
    // } else if (this.chainId === 137) {
    //   // this.escrow = new ethers.Contract(polygonEscrowAddress, escrowABI, this.signer)
    //   return polygonApiUrl
    // } else if (this.chainId === 8453) {
    //   // this.escrow = new ethers.Contract(baseEscrowAddress, escrowABI, this.signer)
    //   return baseApiUrl
    // }
    // throw new Error('Api host is not provided or chain_id is not appropriate for SDK. Use Polygon or Mumbai')
  }

  getCurrentFee: TGetCurrentFee = async (token) => {
    return '0'
  }

  getDepositAmount: TGetDepositAmount = async (link) => {
    const decodedLinkParams = await this._parseUrl(link)
    const { transferId, sender } = decodedLinkParams
    const { token, amount, expiration } = await this.escrow.getDeposit(sender, transferId)
    return { token, amount, expiration }
  }

  redeem: TRedeem = async (dest) => {
    // const decodedLinkParams = await this._parseUrl(link)
    // const { senderSig, linkKey, transferId, sender } = decodedLinkParams
    // const receiverSig = await generateReceiverSig(linkKey, to)
    // const apiHost = await this.getApiHost()
    // const redeem = await linkApi.redeemLink(
    //   apiHost,
    //   this.apiKey,
    //   to,
    //   sender,
    //   this.escrow.address,
    //   transferId,
    //   receiverSig,
    //   senderSig
    // )
    // const { data } = redeem
    // return {
    //   ...data,
    //   transferId
    // }

    return '0x...'
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
    // if (!this.escrow) {
    //     return alert('escrow contract not provided')
    // }
    // if (!this.transferId) {
    //     return alert('transferId not provided')
    // }
    // if (!this.expiration) {
    //     return alert('expiration not provided')
    // }
    // if (!this.amount) {
    //     return alert('amount not provided')
    // }
    // if (!this.signer) {
    //     return alert('signer not provided')
    // }
    // const auth = await getDepositAuthorization(
    //   this.signer,
    //   this.escrow.address,
    //   this.amount,
    //   validAfter,
    //   validBefore,
    //   this.transferId,
    //   this.expiration,
    //   domain,
    //   this.chainId
    // )
    // if (auth) {
    //   const result = await linkApi.deposit(
    //     this.apiHost,
    //     this.apiKey,
    //     this.sender,
    //     this.escrow.address,
    //     this.transferId,
    //     this.expiration,
    //     this.amount,
    //     auth
    //   )
    //   const { data } = result
    //   return data
    // }

    return '0x...'
  }

  _parseUrl: TParseURL = async (link) => {
    const decodedLink = decodeLink(link)
    const linkKeyId = (new ethers.Wallet(decodedLink.linkKey)).address
    const escrowPaymentDomain: TEscrowPaymentDomain = {
      name: "LinkdropEscrow",
      version: "1",
      chainId: this.chainId,
      verifyingContract: this.escrow.address,
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

  _getNextTransferId: TGetNextTransferId = async () => {
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

    const transferId = await this._getNextTransferId()
    
    const escrowPaymentDomain: TEscrowPaymentDomain = {
      name: "LinkdropEscrow",
      version: "1",
      chainId: this.chainId,
      verifyingContract: this.escrow.address,
    }

    const result = await generateLinkKeyandSignature(
      signTypedData,
      transferId,
      escrowPaymentDomain
    )
    if (result) {
      const { linkKey, linkKeyId, senderSig } = result
      const linkParams: TLink = {
        linkKey,
        senderSig,
        transferId,
        chainId: this.chainId
      }
      return {
        claimUrl: encodeLink(this.baseUrl, linkParams),
        transferId: transferId
      }
    }
    return {
      claimUrl: 'https://google.com',
      transferId: '666'
    }
  }
}
export default PaymentLink
