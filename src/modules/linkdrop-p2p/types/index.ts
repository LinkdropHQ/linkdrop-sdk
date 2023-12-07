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

interface ILinkdropP2P {
  createClaimLink: TCreateClaimLink
  retrieveClaimLink: TRetrieveClaimLink
  getClaimLink: TGetClaimLink
  _initializeClaimLink: TInitializeClaimLink
  _getCurrentFee: TGetCurrentFee
  getLimits: TGetLimits
  getSenderHistory: TGetHistory
  getVersionFromClaimUrl: TGetVersionFromClaimUrl
  getVersionFromEscrowContract: TGetVersionFromEscrowContract
}

export {
  TCreateClaimLink,
  TGetCurrentFee,
  TConstructorArgs,
  TGetVersionFromEscrowContract,
  TGetVersionFromClaimUrl,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink,
  TGetLimits,
  TGetHistory
}
export default ILinkdropP2P