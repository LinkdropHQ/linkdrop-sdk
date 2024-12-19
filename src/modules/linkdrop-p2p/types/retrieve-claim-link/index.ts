import ClaimLink from "../../../claim-link"

export type TRetrieveClaimLinkArgs = {
  chainId: number
  txHash?: string
  sender?: string
  transferId?: string
  customApiHost?: string
}

type TRetrieveClaimLink = ({
  chainId,
  txHash,
  sender,
  transferId,
  customApiHost
}: TRetrieveClaimLinkArgs) => Promise<ClaimLink>

export default TRetrieveClaimLink