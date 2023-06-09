import { Signer, ethers } from 'ethers'
import ILinkSDK, { TCreateLinkdrop, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop, TRedeem } from './types'
import Linkdrop from '../linkdrop'
import { generateReceiverSig } from "./../../utils/payment-link-utils"
import axios from 'axios'
import { escrowABI } from '../../abi'
import { escrowAddress } from '../../configs'
import { linkApi } from '../../api'

class LinkSDK implements ILinkSDK {
    apiKey: string
    signer: Signer
    escrow: ethers.Contract
    apiHost: string

    constructor(
      apiKey: string,
      apiHost: string,
      signer: Signer
    ) {
      this.apiKey = apiKey
      this.signer = signer
      this.escrow = new ethers.Contract(escrowAddress, escrowABI, signer)
      this.apiHost = apiHost || 'https://mumbai.escrow-payment-api.linkdrop.io'
    }

    getLinkdrop: TGetLinkdrop = ({ token, transferId }) => {
      return new Linkdrop({ token, transferId })
    }

    createLinkdrop: TCreateLinkdrop = async ({ token, amount, expiration }) => {
      const options = {
        signer: this.signer,
        escrow: this.escrow,
        apiHost: this.apiHost
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
      const transferId = "1345678"
      const sender = "0x4D0714544Ede1BE9bc39d73846B0fF2233DE79c8"
      const { amount, expiration } = await this.escrow.getDeposit(sender, transferId)
      return amount
    }

    redeem: TRedeem = async (link, to) => {
      const { senderSig, linkKey, transferId, sender } = this._parseUrl(link)
      const receiverSig = await generateReceiverSig(linkKey, to)
      const redeem = await linkApi.redeemLink(
        this.apiHost,
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

    _parseUrl(link) {
      const { senderSig, linkKey, transferId, sender } = link
      return { senderSig, linkKey, transferId, sender }
    }
}

export default LinkSDK
