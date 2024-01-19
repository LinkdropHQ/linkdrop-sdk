import {
  ETokenType,
  ETokenAddress,
  TClaimLinkItemOperation,
  TGetRandomBytes,
  TClaimLinkItemStatus
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
  tokenType: ETokenType
  escrowAddress?: string
  operations?: TClaimLinkItemOperation[]
  getRandomBytes: TGetRandomBytes
  linkKey: string | null
  tokenId?: string
  forRecipient?: boolean
  amount: string
  feeAmount: string
  feeAuthorization?: string
  feeToken: string
  totalAmount: string
  status?: TClaimLinkItemStatus
}


export default TConstructorArgs
