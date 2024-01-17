import {
  ETokenType,
  ETokenAddress,
  TClaimLinkItemOperation,
  TGetRandomBytes
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
  forReciever?: boolean
  amount: string
  feeAmount: string
  feeAuthorization?: string
  feeToken: string
  totalAmount: string
}


export default TConstructorArgs
