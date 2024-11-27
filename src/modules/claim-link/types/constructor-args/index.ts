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
}


export default TConstructorArgs
