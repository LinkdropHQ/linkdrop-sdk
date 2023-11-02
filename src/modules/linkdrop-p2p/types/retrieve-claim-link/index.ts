import ClaimLink from "../../../claim-link"

export type TRetrieveClaimLinkArgs = {
  chainId: number
  txHash?: string
  sender?: string
  transferId?: string
}

type TRetrieveClaimLink = ({
  chainId,
  txHash,
  sender,
  transferId
}: TRetrieveClaimLinkArgs) => Promise<ClaimLink | void>

export default TRetrieveClaimLink