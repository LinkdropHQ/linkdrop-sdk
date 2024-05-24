import { EChains } from '../types'

type TDefineNetworkName = (
  chainId: number | null
) => string | null

const defineNetworkName: TDefineNetworkName = (chainId) => {
  switch (Number(chainId)) {
    case EChains.polygon: return 'polygon'
    case EChains.base: return 'base'
    case EChains.sepolia: return 'sepolia'
    case EChains.baseGoerli: return 'goerli'
    case EChains.degen: return 'degen'
    case EChains.avalanche: return 'avalanche'
    case EChains.optimism: return 'optimism'
    case EChains.arbitrum: return 'arbitrum'
    case EChains.gnosis: return 'gnosis'

    default:
      return null
  }
}

export default defineNetworkName