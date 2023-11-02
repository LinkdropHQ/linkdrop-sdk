import { EChains } from '../types'
import { polygonApiUrl, baseApiUrl, mumbaiApiUrl } from '../configs'

type TDefineApiHost = (
  chainId: number | null
) => string | null

const defineApiHost: TDefineApiHost = (chainId) => {
  switch (Number(chainId)) {
    case EChains.polygon: return polygonApiUrl
    case EChains.base: return baseApiUrl
    case EChains.mumbai: return mumbaiApiUrl
    default:
      return null
  }
}

export default defineApiHost