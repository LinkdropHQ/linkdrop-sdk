import { ETokenSymbol, TTokenType } from '../types'

type TDefineTokenType = (
  tokenSymbol: ETokenSymbol
) => TTokenType | null

const defineTokenType: TDefineTokenType = (tokenSymbol) => {
  switch (tokenSymbol) {
    case ETokenSymbol.eth:
    case ETokenSymbol.matic: return 'NATIVE'
    case ETokenSymbol.usdc: return 'ERC20'
    default: return null
  }
}

export default defineTokenType