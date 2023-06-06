import { providers } from 'ethers'
import ILinkSDK, { TCreateLinkdrop, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop } from './types'
import Linkdrop from '../linkdrop'
import axios from 'axios'

class LinkSDK implements ILinkSDK {
  apiKey: string
  provider: providers.Web3Provider

  constructor(
    apiKey: string,
    provider: providers.Web3Provider
  ) {
    this.apiKey = apiKey
    this.provider = provider
  }

  getLinkdrop: TGetLinkdrop = ({ token, sender, transferId }) => {
    return new Linkdrop({ token, sender, transferId })
  }

  createLinkdrop: TCreateLinkdrop = ({ token, sender, amount }) => {
    return new Linkdrop({ token, sender, amount })
  }

  fetchHistory: TFetchHistory = async ({ sender, token }) => {
    const linkdrops = await axios.get('')
    return linkdrops
  }

  getCurrentFee: TGetCurrentFee = async (token) => { 
    // const fee = await LinkdropEscrow.getFee()  // SC call
    return '100'
  }

  getDepositAmount: TGetDepositAmount = async (link) => { 
    // todo
    return '100'
  }
}

export default LinkSDK