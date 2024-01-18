import {
  TTokenType,
  ETokenAddress,
  TClaimLinkItemOperation,
  TGetRandomBytes,
  TClaimLinkItemStatus
} from "../../../../types"

type TConstructorArgs = {
  sender: string
  token?: ETokenAddress
  amount: string
  expiration?: number
  chainId: number
  apiHost: string
  apiKey: string | null
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  tokenType: TTokenType
  escrowAddress?: string
  operations?: TClaimLinkItemOperation[]
  getRandomBytes?: TGetRandomBytes
  forRecipient?: boolean
  fee?: string
  totalAmount?: string
  status?: TClaimLinkItemStatus
}


export default TConstructorArgs
