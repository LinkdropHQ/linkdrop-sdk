import TCreateClaimLink from './create-claim-link'
import TRetrieveClaimLink from './retrieve-claim-link'
import TGetClaimLink from './get-claim-link'
import TConstructorArgs from './constructor-args'
import TInitializeClaimLink from './initialize-claim-link'
import TGetLimits from './get-limits'
import TGetHistory from './get-history'
import TGetVersionFromClaimUrl from './get-version-from-claim-url'
import TGetVersionFromEscrowContract from './get-version-from-escrow-contract'
import TGetCurrentFee from './get-current-fee'
import TGetLinkSourceFromClaimUrl from './get-link-source-from-claim-url'

interface ILinkdropSDK {
  createClaimLink: TCreateClaimLink
  retrieveClaimLink: TRetrieveClaimLink
  getClaimLink: TGetClaimLink
  _initializeClaimLink: TInitializeClaimLink
  _getCurrentFee: TGetCurrentFee
  getLimits: TGetLimits
  getSenderHistory: TGetHistory
  getVersionFromClaimUrl: TGetVersionFromClaimUrl
  getVersionFromEscrowContract: TGetVersionFromEscrowContract
  getLinkSourceFromClaimUrl: TGetLinkSourceFromClaimUrl
}

export {
  TCreateClaimLink,
  TGetCurrentFee,
  TGetLinkSourceFromClaimUrl,
  TConstructorArgs,
  TGetVersionFromEscrowContract,
  TGetVersionFromClaimUrl,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink,
  TGetLimits,
  TGetHistory
}
export default ILinkdropSDK