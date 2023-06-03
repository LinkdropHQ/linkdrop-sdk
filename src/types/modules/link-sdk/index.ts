import { TNetworkName } from '../../network-name'
import { TInitializeLink } from './initialize-link'

interface ILinkSDK {
  network: TNetworkName
  apiHost: string
  apiKey: string
  provider: any
  claimHostUrl: string

  initializeLink: TInitializeLink
}

export default ILinkSDK