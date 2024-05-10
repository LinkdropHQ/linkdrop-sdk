import { ETokenSymbol, TTokenType, ETokenAddress } from '../types'

type TDefineTokenSymbol = (
  tokenType: TTokenType,
  chainId: number,
  tokenAddress: string
) => ETokenSymbol | null

const defineTokenSymbol: TDefineTokenSymbol = (
  tokenSymbol,
  chainId,
  tokenAddress
) => {
  switch (tokenSymbol) {
    case 'NATIVE':
      if (chainId === 137) {
        return ETokenSymbol.matic
      }
      return ETokenSymbol.eth
    case 'ERC20': {
      if (
        chainId == 137 && tokenAddress.toLowerCase() === ETokenAddress.usdcBridgedPolygon
      ) {
        return ETokenSymbol.usdce
      }
      return ETokenSymbol.usdc
    }
    default: return null
  }
}

export default defineTokenSymbol