import ClaimLink from "../../../claim-link"
import * as LinkdropP2P2 from 'linkdrop-p2p-sdk2'

type TGetClaimLink = (claimUrl: string) => Promise<ClaimLink | LinkdropP2P2.ClaimLink>

export default TGetClaimLink