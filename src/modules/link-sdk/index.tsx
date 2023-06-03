import { ILinkSDK, TNetworkName } from '../../types'
import Link from '../link'
import { defineNetworkName } from '../../helpers'
import { campaignsApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'
import { providers } from 'ethers'

class LinkSDK implements ILinkSDK {
  network: TNetworkName
  apiHost: string
  apiKey: string
  provider: providers.Web3Provider
  claimHostUrl: string
  chainId: number
  address: `0x${string}`

  constructor ({
    apiKey,
    apiHost,
    claimHostUrl,
    provider
  }: {
    apiHost?: string
    claimHostUrl?: string
    provider: any
    apiKey: string
  }) {
    this.claimHostUrl = claimHostUrl || ''
    
     // should be taken from provider
    this.provider = provider
    this.apiKey = apiKey
    if (apiHost) {
      this.apiHost = apiHost
    } else {
      // this.apiHost = (this.network === 'goerli' || this.network === 'mumbai') ? testnetsApiUrl : apiUrl
      this.apiHost = apiUrl
    }
    this.initializeSDK()
  }

  initializeSDK = async () => {
    // not a best solution, WIP
    const network = await this.provider.getNetwork()
    if (network) {
      const { chainId } = network
      this.chainId = chainId
      this.network = defineNetworkName(chainId)
    }
    const accounts = await this.provider.listAccounts()
    if (accounts && accounts.length > 0) {
      this.address = accounts[0] as `0x${string}`
    }
  }


  initializeLink = async ({ tokenAddress, tokenId, tokenAmount }) => {
    return new Link({
      apiKey: this.apiKey,
      network: this.network,
      chainId: this.chainId,
      address: this.address,
      apiHost: this.apiHost,
      claimHostUrl: this.claimHostUrl,
      provider: this.provider,
      tokenAddress,
      tokenId,
      tokenAmount,
      
    })
  }
}

export default LinkSDK