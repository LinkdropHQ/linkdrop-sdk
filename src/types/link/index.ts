import { TTokenType } from "../token-type"

export type TLink = {
    senderSig?: string
    sender?: string
    linkKey: string
    transferId: string
    tokenType: TTokenType | null
    chainId: number
}
