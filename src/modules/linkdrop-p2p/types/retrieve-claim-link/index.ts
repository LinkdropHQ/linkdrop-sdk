import ClaimLink from "../../../claim-link"
import * as LinkdropP2P2 from 'linkdrop-p2p-sdk2'

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
}: TRetrieveClaimLinkArgs) => Promise<ClaimLink | LinkdropP2P2.ClaimLink>

export default TRetrieveClaimLink