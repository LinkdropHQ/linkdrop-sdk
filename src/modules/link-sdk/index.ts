import { Signer, ethers } from 'ethers'
import ILinkSDK, { TGetApiHost, TCreateLinkdrop, TParseURL, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop, TRedeem, TGetChainId } from './types'
import { TEscrowPaymentDomain } from '../../types'
import Linkdrop from '../linkdrop'
import { generateReceiverSig, decodeSenderAddress } from "../../utils"
import { escrowABI } from '../../abi'
import { mumbaiEscrowAddress, polygonEscrowAddress, baseEscrowAddress } from '../../configs'
import { linkApi } from '../../api'
import { mumbaiApiUrl, polygonApiUrl, baseApiUrl } from '../../configs'
import { decodeLink } from '../../helpers'

class LinkSDK implements ILinkSDK {
  apiKey: string
  signer: Signer
  escrow: ethers.Contract
  apiHost?: string
  linkHost?: string
  chainId?: number

  constructor({
    apiKey,
    apiHost,
    signer,
    linkHost
  }: {
      apiKey: string,
      apiHost?: string,
      signer: Signer,
      linkHost?: string
    }) {
    this.apiKey = apiKey
    this.signer = signer
    this.apiHost = apiHost
    this.linkHost = linkHost
    this.getApiHost()
    this.escrow = new ethers.Contract(polygonEscrowAddress, escrowABI, this.signer)
  }

  getChainId: TGetChainId = async () => {
    if (this.chainId) { return this.chainId }
    this.chainId = await this.signer.getChainId()
    return this.chainId
  }

  getApiHost: TGetApiHost = async () => {
    if (this.apiHost) { return this.apiHost }
    const chainId = await this.getChainId()
    if (chainId === 80001) {
      this.escrow = new ethers.Contract(mumbaiEscrowAddress, escrowABI, this.signer)
      return mumbaiApiUrl
    } else if (chainId === 137) {
      this.escrow = new ethers.Contract(polygonEscrowAddress, escrowABI, this.signer)
      return polygonApiUrl
    } else if (chainId === 8453) {
      this.escrow = new ethers.Contract(baseEscrowAddress, escrowABI, this.signer)
      return baseApiUrl
    }
    throw new Error('Api host is not provided or chain_id is not appropriate for SDK. Use Polygon or Mumbai')
  }

  getLinkdrop: TGetLinkdrop = async ({ token, transferId }) => {
    const apiHost = await this.getApiHost()
    const options = {
      apiHost: apiHost,
      signer: this.signer,
      escrow: this.escrow,
      linkHost: this.linkHost
    }
    const linkdrop = new Linkdrop({ token, transferId, options })
    await linkdrop.initialize()
    return linkdrop
  }

  getTransferStatus = async ({ sender, transferId, networkName }) => {
    const apiHost = await this.getApiHost()
    const transferStatus = await linkApi.getTransferStatus(
      apiHost,
      sender,
      transferId,
      networkName
    )
    const { data } = transferStatus
    return data
  }

  createLinkdrop: TCreateLinkdrop = async ({ token, amount, expiration }) => {
    const apiHost = await this.getApiHost()
    const options = {
      signer: this.signer,
      escrow: this.escrow,
      apiHost: apiHost,
      linkHost: this.linkHost
    }
    const linkdrop = new Linkdrop({ token, amount, expiration, options })
    await linkdrop.initialize()
    return linkdrop
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

  redeem: TRedeem = async (link, to) => {
    const decodedLinkParams = await this._parseUrl(link)
    const { senderSig, linkKey, transferId, sender } = decodedLinkParams
    const receiverSig = await generateReceiverSig(linkKey, to)
    const apiHost = await this.getApiHost()
    const redeem = await linkApi.redeemLink(
      apiHost,
      to,
      sender,
      this.escrow.address,
      transferId,
      receiverSig,
      senderSig
    )
    const { data } = redeem
    return {
      ...data,
      transferId
    }
  }

  _parseUrl: TParseURL = async (link) => {
    const decodedLink = decodeLink(link)
    const linkKeyId = (new ethers.Wallet(decodedLink.linkKey)).address
    const chainId = await this.getChainId()
    const escrowPaymentDomain: TEscrowPaymentDomain = {
      name: "LinkdropEscrow",
      version: "1",
      chainId: chainId,
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
}
export default LinkSDK
