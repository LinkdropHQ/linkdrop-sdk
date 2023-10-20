import { EChains } from '../types'
import { polygonApiUrl, baseApiUrl, mumbaiApiUrl, devApiUrl } from '../configs'

type TDefineApiHost = (
  chainId: number | null
) => string | null

const defineApiHost: TDefineApiHost = (chainId) => {
  switch (Number(chainId)) {
    case EChains.polygon: return devApiUrl
    case EChains.base: return devApiUrl
    case EChains.mumbai: return devApiUrl
    default:
      return null
  }
}

export default defineApiHost