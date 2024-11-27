import { TTokenType, ETokenAddress, TClaimLinkSource, TDeploymentType } from "../../../../types"
import ClaimLink from "../../../claim-link"

export type TInitializeClaimLinkArgs = {
  sender: string
  token: ETokenAddress
  amount: string
  expiration: number
  chainId: number
  apiUrl: string
  apiKey: string | null
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  feeAmount?: string
  totalAmount?: string
  feeToken?: string
  feeAuthorization?: string
  tokenType: TTokenType,
  tokenId?: string
  forRecipient?: boolean
  source: TClaimLinkSource
  deployment: TDeploymentType

  pendingTxs?: number
  pendingBlocks?: number | null
  pendingTxSubmittedBn?: number | null
  pendingTxSubmittedAt?: number | null
}

type TInitializeClaimLink = ({
  token,
  expiration,
  chainId,
  baseUrl,
  amount,
  sender, 
  apiUrl, 
  apiKey,
  transferId,
  claimUrl,
  tokenType,
  feeAmount,
  totalAmount,
  pendingTxs,
  pendingBlocks,
  pendingTxSubmittedBn,
  pendingTxSubmittedAt,
  feeAuthorization,
  feeToken,
  tokenId,
  forRecipient,
  source,
  deployment
}: TInitializeClaimLinkArgs) => Promise<(ClaimLink)>

export default TInitializeClaimLink