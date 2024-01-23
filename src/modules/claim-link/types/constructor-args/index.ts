import {
  TTokenType,
  ETokenAddress,
  TClaimLinkItemOperation,
  TGetRandomBytes,
  TClaimLinkItemStatus,
  TClaimLinkSource
} from "../../../../types"

type TConstructorArgs = {
  sender: string
  token?: ETokenAddress
  expiration: number
  chainId: number
  apiUrl: string
  apiKey: string | null
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  tokenType: TTokenType
  escrowAddress?: string
  operations?: TClaimLinkItemOperation[]
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
  status?: TClaimLinkItemStatus
}


export default TConstructorArgs
