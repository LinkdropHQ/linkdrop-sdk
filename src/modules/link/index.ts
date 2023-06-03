import { TNetworkName, ILink } from '../../types'
import TGenerate from '../../types/modules/link/generate'
import TApprove from '../../types/modules/link/approve'
import TSponsorClaimFees from '../../types/modules/link/sponsor-claim-fees'
import LinkdropSDK from '../linkdrop-sdk'
import contracts from '../../configs/contracts'

class Link implements ILink {
  network: TNetworkName
  apiHost: string
  apiKey: string
  provider: any
  claimHostUrl: string
  tokenAddress: string
  tokenId?: string
  tokenAmount?: string
  sdk: LinkdropSDK
  address: `0x${string}`
  chainId: number
  proxyContractAddress: string

  constructor ({
    apiKey,
    network,
    apiHost,
    claimHostUrl,
    provider,
    tokenAddress,
    tokenId,
    tokenAmount,
    address, 
    chainId
  }: {
    apiHost: string
    network: TNetworkName
    claimHostUrl: string
    provider: any
    apiKey: string
    tokenAddress: string
    tokenId?: string
    tokenAmount?: string
    address: `0x${string}`
    chainId: number
  }) {
    this.claimHostUrl = claimHostUrl || ''
    this.network = network || 'polygon'
    this.provider = provider
    this.apiKey = apiKey
    this.apiHost = apiHost
    this.tokenAddress = tokenAddress
    this.tokenId = tokenId
    this.tokenAmount = tokenAmount
    this.sdk = new LinkdropSDK({ apiHost })
    this.address = address
    this.chainId = chainId
  }

  generate: TGenerate = async () => {
    return { link: '' }
  }

  sponsorClaimFees: TSponsorClaimFees = async (
    nativeTokenAmount
  ) => {
    // here should create proxy
    // then create new campaign with single batch
    const contract = contracts[this.chainId]
    const campaignId = String(+(new Date()))
    const proxyContractAddress = await this.sdk.utils.computeProxyAddress(
      contract.factory,
      this.address,
      campaignId
    )
    if (proxyContractAddress) {
      this.proxyContractAddress = proxyContractAddress 
      return { txHash: '' }
    }
    
    
  }

  createCampaign = () => {
    
  }


  approve: TApprove = async () => {
    return { txHash: '' }
  }

}

export default Link