import { TTokenType, ETokenAddress } from "../../../../types"

type TConstructorArgs = {
  sender: string
  token?: ETokenAddress
  amount: string
  expiration?: string
  chainId: number
  apiHost: string
  apiKey: string
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  tokenType: TTokenType
}


export default TConstructorArgs
