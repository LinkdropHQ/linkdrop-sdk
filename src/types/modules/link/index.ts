import { TNetworkName } from '../../network-name'
import TGenerate from './generate'
import TApprove from './approve'
import TSponsorClaimFees from './sponsor-claim-fees'

interface ILink {
  network: TNetworkName
  apiHost: string
  apiKey: string
  provider: any
  claimHostUrl: string
  tokenAddress: string
  tokenId?: string
  tokenAmount?: string
  generate: TGenerate
  approve: TApprove
  sponsorClaimFees: TSponsorClaimFees

}

export default ILink