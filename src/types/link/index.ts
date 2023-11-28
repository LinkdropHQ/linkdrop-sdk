import { TTokenType, ETokenSymbol } from ".."


export type TLink = {
  senderSig?: string
  sender?: string
  linkKey: string
  transferId: string
  tokenType: TTokenType | null
  chainId: number
  version?: string
  tokenSymbol?: ETokenSymbol
}
