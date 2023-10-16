import ILinkdrop, {
  TCreatePaymentLink,
  TConstructorArgs,
  TGetPaymentLink,
  TRetrievePaymentLink
} from './types'
import { generateLinkKeyandSignature } from "../../utils"
import { ethers } from 'ethers'
import { TDomain, TEscrowPaymentDomain, TLink } from '../../types'
import { linkApi } from '../../api'
import { encodeLink, defineApiHost } from '../../helpers'
import { claimHost } from '../../configs'
import PaymentLink from '../payment-link'
import { errors } from '../../texts'

class LinkdropPaySDK implements ILinkdrop {
  apiHost: string
  apiKey: string
  baseUrl: string

  constructor({
    apiKey,
    baseUrl,
    apiHost
  }: TConstructorArgs) {
    this.apiHost = apiHost
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  // getApiHost: TGetApiHost = async () => {
    // if (this.chainId === 80001) {
    //   return mumbaiApiUrl
    // } else if (this.chainId === 137) {
    //   this.escrow = new ethers.Contract(polygonEscrowAddress, escrowABI, this.signer)
    //   return polygonApiUrl
    // } else if (this.chainId === 8453) {
    //   this.escrow = new ethers.Contract(baseEscrowAddress, escrowABI, this.signer)
    //   return baseApiUrl
    // }
    // throw new Error('Api host is not provided or chain_id is not appropriate for SDK. Use Polygon or Mumbai')
  // }


  createPaymentLink: TCreatePaymentLink = async ({
    token,
    expiration,
    chainId,
    amount,
    from
  }) => {
    if (!chainId) {
      throw new Error(errors.argument_not_provided('chainId'))
    }
    const apiHost = defineApiHost(chainId)
    if (!apiHost) {
      throw new Error(errors.chain_not_supported())
    }
    if (!from) {
      throw new Error(errors.argument_not_provided('from'))
    }
    if (!expiration) {
      throw new Error(errors.argument_not_provided('expiration'))
    }
    if (!amount) {
      throw new Error(errors.argument_not_provided('amount'))
    }
    if (!token) {
      throw new Error(errors.argument_not_provided('token'))
    }
    

    const paymentLink = new PaymentLink({
      token,
      expiration,
      chainId,
      amount,
      sender: from,
      apiHost
    })
    paymentLink.initialize()
    return paymentLink
    
    // const escrowPaymentDomain: TEscrowPaymentDomain = {
    //   name: "LinkdropEscrow",
    //   version: "1",
    //   chainId: this.chainId,
    //   verifyingContract: this.escrow.address,
    // }
    // const result = await generateLinkKeyandSignature(this.signer, this.transferId, escrowPaymentDomain)
    // if (result) {
    //   const { linkKey, linkKeyId, senderSig } = result
    //   const linkParams: TLink = {
    //     linkKey,
    //     senderSig,
    //     transferId: this.transferId,
    //     chainId: this.chainId
    //   }
    //   return {
    //     link: encodeLink(this.linkHost, linkParams),
    //     transferId: this.transferId
    //   }
    // }


  }

  getPaymentLink: TGetPaymentLink = async (claimUrl) => {
    const apiHost = defineApiHost(80001)
    if (!apiHost) {
      throw new Error(errors.chain_not_supported())
    }
    const paymentLinkData = {
      token: '0x...',
      expiration: String(+new Date),
      chainId: 80001,
      amount: '10000',
      sender: '0x...',
      apiHost
    }
    const paymentLink = new PaymentLink(paymentLinkData)
    paymentLink.initialize()
    return paymentLink
  }

  retrievePaymentLink: TRetrievePaymentLink = async ({
    chainId,
    txHash,
    sender,
    transferId
  }) => {
    const apiHost = defineApiHost(chainId)
    if (!apiHost) {
      throw new Error(errors.chain_not_supported())
      return
    }
    const paymentLinkData = {
      token: '0x...',
      expiration: String(+new Date),
      chainId: 80001,
      amount: '10000',
      sender: '0x...',
      apiHost
    }
    const paymentLink = new PaymentLink(paymentLinkData)
    paymentLink.initialize()
    return paymentLink
  }
}

export default LinkdropPaySDK
