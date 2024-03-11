import ClaimLink from "../../../claim-link"
import { ClaimLinkV2 } from '../../../../index'

type TGetClaimLink = (claimUrl: string) => Promise<ClaimLink | ClaimLinkV2>

export default TGetClaimLink