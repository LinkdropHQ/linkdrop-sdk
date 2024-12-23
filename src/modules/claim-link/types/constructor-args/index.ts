import {
  TTokenType,
  ETokenAddress,
  TClaimLinkOperation,
  TGetRandomBytes,
  TClaimLinkItemStatus,
  TClaimLinkSource,
  TDeploymentType
} from "../../../../types"

type TConstructorArgs = {
  sender: string
  token?: ETokenAddress
  expiration: number
  deployment: TDeploymentType
  chainId: number
  apiUrl: string
  apiKey: string | null
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  tokenType: TTokenType
  escrowAddress?: string
  operations?: TClaimLinkOperation[]
  getRandomBytes: TGetRandomBytes
  linkKey: string | null
  tokenId?: string
  forRecipient?: boolean
  source: TClaimLinkSource

  amount: string
  feeAmount: string
  feeAuthorization?: string
  feeToken: string
  totalAmount: string

  pendingTxs?: number
  pendingBlocks?: number | null
  pendingTxSubmittedBn?: number | null
  pendingTxSubmittedAt?: number | null
  status?: TClaimLinkItemStatus
  // data for dashboard links, otherwise null 
  wallet: string | null
  claimingFinishedDescription: string | null
  claimingFinishedButtonTitle: string  | null
  claimingFinishedButtonURL: string | null
  claimingFinishedButtonOn: boolean | null
  claimingFinishedAutoRedirect: boolean | null
  preferredWalletOn: boolean | null
  additionalWalletsOn: boolean | null
  weiAmount: string | null
  decryptedMessage?: string
  encryptedSenderMessage?: string
  senderMessage?: string
}


export default TConstructorArgs
