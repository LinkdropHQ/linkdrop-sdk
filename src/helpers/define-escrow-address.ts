import { EChains } from '../types'
import { mumbaiEscrowAddress, polygonEscrowAddress, baseEscrowAddress } from '../configs'

type TDefineEscrowAddress = (
  chainId: number | null
) => string | null

const defineEscrowAddress: TDefineEscrowAddress = (chainId) => {
  switch (Number(chainId)) {
    case EChains.polygon: return polygonEscrowAddress
    case EChains.base: return baseEscrowAddress
    case EChains.mumbai: return mumbaiEscrowAddress
    default:
      return null
  }
}

export default defineEscrowAddress