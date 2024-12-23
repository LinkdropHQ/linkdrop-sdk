import ClaimLink from "../../../claim-link"
import { ClaimLinkV3_11 } from '../../../../index'

type TGetClaimLink = (claimUrl: string) => Promise<ClaimLink | ClaimLinkV3_11>

export default TGetClaimLink