import { ETokenSymbol, TTokenType } from '../types'

type TDefineTokenSymbol = (
  tokenType: TTokenType,
  chainId: number
) => ETokenSymbol | null

const defineTokenSymbol: TDefineTokenSymbol = (
  tokenSymbol,
  chainId
) => {
  switch (tokenSymbol) {
    case 'NATIVE':
      if (chainId === 80001 || chainId === 137) {
        return ETokenSymbol.matic
      }
      return ETokenSymbol.eth
    case 'ERC20': return ETokenSymbol.usdc
    default: return null
  }
}

export default defineTokenSymbol