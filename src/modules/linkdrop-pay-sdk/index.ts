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
import PaymentLink from '../payment-link'
import { errors } from '../../texts'

class LinkdropPaySDK implements ILinkdrop {
  apiKey: string
  baseUrl: string

  constructor({
    apiKey,
    baseUrl
  }: TConstructorArgs) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

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
      apiHost,
      apiKey: this.apiKey
    })

    return paymentLink
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
      apiHost,
      apiKey: this.apiKey,
      transferId: '1111',
      claimUrl: 'https://google.com'
    }
    const paymentLink = new PaymentLink(paymentLinkData)
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
    }
    const paymentLinkData = {
      token: '0x...',
      expiration: String(+new Date),
      chainId: chainId,
      amount: '10000',
      sender: '0x...',
      apiHost,
      apiKey: this.apiKey,
      transferId: '1111',
      claimUrl: 'https://google.com'
    }
    const paymentLink = new PaymentLink(paymentLinkData)
    return paymentLink
  }
}

export default LinkdropPaySDK
