import { EChains, TTokenType } from '../types'
import {
  mumbaiEscrowAddress,
  polygonEscrowAddress,
  baseEscrowAddress,
  mumbaiNativeEscrowAddress,
  baseNativeEscrowAddress,
  polygonNativeEscrowAddress
} from '../configs'

type TDefineEscrowAddress = (
  chainId: number | null,
  tokenType: TTokenType
) => string | null

const defineEscrowAddress: TDefineEscrowAddress = (
  chainId,
  tokenType
) => {
  if (!chainId || !tokenType) {
    return null
  }
  if (tokenType === 'NATIVE') {
    switch (Number(chainId)) {
      case EChains.polygon: return polygonNativeEscrowAddress
      case EChains.base: return baseNativeEscrowAddress
      case EChains.mumbai: return mumbaiNativeEscrowAddress
      default:
        return null
    }
  }
  switch (Number(chainId)) {
    case EChains.polygon: return polygonEscrowAddress
    case EChains.base: return baseEscrowAddress
    case EChains.mumbai: return mumbaiEscrowAddress
    default:
      return null
  }
  
}

export default defineEscrowAddress