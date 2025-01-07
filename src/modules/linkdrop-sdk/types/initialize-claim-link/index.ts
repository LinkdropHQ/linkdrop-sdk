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

  tokenImage: string | null
  tokenName: string | null

  pendingTxs?: number
  pendingBlocks?: number | null
  pendingTxSubmittedBn?: number | null
  pendingTxSubmittedAt?: number | null
  signTypedData?: TSignTypedData
  message?: string
  encryptedSenderMessage?: string
  senderMessage?: string
}

type TInitializeClaimLink = (data: TInitializeClaimLinkArgs) => Promise<(ClaimLink)>


export default TInitializeClaimLink