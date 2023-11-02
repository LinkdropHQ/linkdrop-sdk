import { EChains } from '../types'

type TDefineNetworkName = (
  chainId: number | null
) => string | null

const defineNetworkName: TDefineNetworkName = (chainId) => {
  switch (Number(chainId)) {
    case EChains.polygon: return 'matic'
    case EChains.base: return 'base'
    case EChains.mumbai: return 'mumbai'
    default:
      return null
  }
}

export default defineNetworkName