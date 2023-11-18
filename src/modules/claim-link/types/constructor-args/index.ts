import { TTokenType, ETokenAddress, TClaimLinkItemOperation } from "../../../../types"

type TConstructorArgs = {
  sender: string
  token?: ETokenAddress
  amount: string
  expiration?: number
  chainId: number
  apiHost: string
  apiKey: string
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  tokenType: TTokenType
  escrowAddress?: string
  operations?: TClaimLinkItemOperation[]
}


export default TConstructorArgs
