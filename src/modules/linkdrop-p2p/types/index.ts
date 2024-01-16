import TCreateClaimLink from './create-claim-link'
import TRetrieveClaimLink from './retrieve-claim-link'
import TGetClaimLink from './get-claim-link'
import TConstructorArgs from './constructor-args'
import TInitializeClaimLink from './initialize-claim-link'
import TGetLimits from './get-limits'
import TGetHistory from './get-history'
import TGetVersionFromClaimUrl from './get-version-from-claim-url'
import TGetVersionFromEscrowContract from './get-version-from-escrow-contract'
import { TGetRandomBytes } from '../../../types'

interface ILinkdropP2P {
  apiKey: string | null
  baseUrl: string
  apiUrl?: string
  getRandomBytes?: TGetRandomBytes

  createClaimLink: TCreateClaimLink
  retrieveClaimLink: TRetrieveClaimLink
  getClaimLink: TGetClaimLink
  _initializeClaimLink: TInitializeClaimLink,
  getLimits: TGetLimits
  getSenderHistory: TGetHistory
  getVersionFromClaimUrl: TGetVersionFromClaimUrl
  getVersionFromEscrowContract: TGetVersionFromEscrowContract
}

export {
  TCreateClaimLink,
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