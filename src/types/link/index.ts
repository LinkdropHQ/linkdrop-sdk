import { TTokenType, ETokenSymbol } from ".."


export type TLink = {
  senderSig?: string
  sender?: string
  linkKey: string
  transferId: string
  chainId: number
  version?: string
}
