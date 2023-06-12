import { Signer, ethers } from 'ethers'
import ILinkSDK, { TGetApiHost, TCreateLinkdrop, TParseURL, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop, TRedeem } from './types'
import Linkdrop from '../linkdrop'
import { generateReceiverSig } from "../../utils"
import axios from 'axios'
import { escrowABI } from '../../abi'
import { escrowAddress } from '../../configs'
import { linkApi } from '../../api'
import { mumbaiApiUrl, polygonApiUrl } from '../../configs'
import { decodeLink } from '../../helpers'

class LinkSDK implements ILinkSDK {
  apiKey: string
  signer: Signer
  escrow: ethers.Contract
  apiHost?: string

  constructor({
    apiKey,
    apiHost,
    signer
  }: {
    apiKey: string,
    apiHost?: string,
    signer: Signer
  }) {
    this.apiKey = apiKey
    this.signer = signer
    this.apiHost = apiHost
    this.escrow = new ethers.Contract(escrowAddress, escrowABI, signer)
  }

  getApiHost: TGetApiHost = async () => {
    if (this.apiHost) { return this.apiHost }
    const chainId = await this.signer.getChainId()
    if (chainId === 80001) {
      return mumbaiApiUrl
    } else if (chainId === 137) {
      return polygonApiUrl
    }
    throw new Error('Api host is not provided or chain_id is not appropriate for SDK. Use Polygon or Mumbai')
  }

  getLinkdrop: TGetLinkdrop = async ({ token, transferId }) => {
    const apiHost = await this.getApiHost()
    const options = {
      apiHost: apiHost,
      signer: this.signer,
      escrow: this.escrow,
    }
    return new Linkdrop({ token, transferId, options })
  }

  createLinkdrop: TCreateLinkdrop = async ({ token, amount, expiration }) => {
    const apiHost = await this.getApiHost()
    const options = {
      signer: this.signer,
      escrow: this.escrow,
      apiHost: apiHost
    }
    const linkdrop = new Linkdrop({ token, amount, expiration, options })
    await linkdrop.initialize()
    return linkdrop
  }

  fetchHistory: TFetchHistory = async ({ sender, token }) => {
    const linkdrops = await axios.get('')
    return linkdrops
  }

  getCurrentFee: TGetCurrentFee = async (token) => {
    return '0'
  }

  getDepositAmount: TGetDepositAmount = async (link) => {
    const decodedLinkParams = this._parseUrl(link)
    const { transferId, sender } = decodedLinkParams
    const { amount, expiration } = await this.escrow.getDeposit(sender, transferId)
    return { amount, expiration }
  }

  redeem: TRedeem = async (link, to) => {
    const decodedLinkParams = this._parseUrl(link)
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
    return data
  }

  _parseUrl: TParseURL = (link) => {
      return decodeLink(link)
  }
}

export default LinkSDK
