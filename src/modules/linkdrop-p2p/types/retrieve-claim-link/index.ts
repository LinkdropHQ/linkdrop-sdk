import ClaimLink from "../../../claim-link"
import { ClaimLinkV2 } from '../../../../index'

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
}: TRetrieveClaimLinkArgs) => Promise<ClaimLink | ClaimLinkV2>

export default TRetrieveClaimLink