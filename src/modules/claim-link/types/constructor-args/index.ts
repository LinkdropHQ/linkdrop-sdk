import {
  TTokenType,
  ETokenAddress,
  TClaimLinkItemOperation,
  TGetRandomBytes
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
  getRandomBytes: TGetRandomBytes
  privateKey: string
}


export default TConstructorArgs
