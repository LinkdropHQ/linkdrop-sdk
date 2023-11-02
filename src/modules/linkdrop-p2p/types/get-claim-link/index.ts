import ClaimLink from "../../../claim-link"

type TGetClaimLink = (claimUrl: string) => Promise<ClaimLink | void>

export default TGetClaimLink