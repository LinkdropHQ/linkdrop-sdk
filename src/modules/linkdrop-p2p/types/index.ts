import TCreateClaimLink from './create-claim-link'
import TRetrieveClaimLink from './retrieve-claim-link'
import TGetClaimLink from './get-claim-link'
import TConstructorArgs from './constructor-args'
import TInitializeClaimLink from './initialize-claim-link'
import TGetLimits from './get-limits'
import TGetHistory from './get-history'

interface ILinkdropP2P {
  apiKey: string
  baseUrl: string

  createClaimLink: TCreateClaimLink
  retrieveClaimLink: TRetrieveClaimLink
  getClaimLink: TGetClaimLink
  _initializeClaimLink: TInitializeClaimLink,
  getLimits: TGetLimits
  getSenderHistory: TGetHistory
}

export {
  TCreateClaimLink,
  TConstructorArgs,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink,
  TGetLimits,
  TGetHistory
}
export default ILinkdropP2P