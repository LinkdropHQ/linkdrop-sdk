import { TTokenType, ETokenAddress, TClaimLinkSource, TDeploymentType, TSignTypedData } from "../../../../types"
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

  wallet: string | null
  claimingFinishedDescription: string | null
  claimingFinishedButtonTitle: string  | null
  claimingFinishedButtonURL: string | null
  claimingFinishedButtonOn: boolean | null
  claimingFinishedAutoRedirect: boolean | null
  preferredWalletOn: boolean | null
  additionalWalletsOn: boolean | null
  weiAmount: string | null

  pendingTxs?: number
  pendingBlocks?: number | null
  pendingTxSubmittedBn?: number | null
  pendingTxSubmittedAt?: number | null
  signTypedData?: TSignTypedData
  message?: string
  encryptedMessage?: string
  decryptedMessage?: string
}

type TInitializeClaimLink = (data: TInitializeClaimLinkArgs) => Promise<(ClaimLink)>
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
  deployment,
  message,
  signTypedData,
  encryptedMessage,
  decryptedMessage
}: TInitializeClaimLinkArgs) => Promise<(ClaimLink)>

export default TInitializeClaimLink