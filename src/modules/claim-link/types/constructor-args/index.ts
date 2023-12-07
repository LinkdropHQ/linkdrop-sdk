import {
  TTokenType,
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
  tokenType: TTokenType
  escrowAddress?: string
  operations?: TClaimLinkItemOperation[]
  getRandomBytes: TGetRandomBytes
  privateKey: string | null

  amount: string
  feeAmount: string
  feeAuthorization?: string
  feeToken: string
  totalAmount: string
}


export default TConstructorArgs
