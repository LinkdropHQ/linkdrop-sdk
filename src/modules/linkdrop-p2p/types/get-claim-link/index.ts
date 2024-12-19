import ClaimLink from "../../../claim-link"

type TGetClaimLink = (claimUrl: string) => Promise<ClaimLink>

export default TGetClaimLink