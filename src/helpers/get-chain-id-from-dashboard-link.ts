import { parseQueryParams } from '.'
import { EChains } from '../types'

type TGetChainIdFromDashboardLink = (claimUrl: string) => EChains

const getChainIdFromDashboardLink: TGetChainIdFromDashboardLink = (claimUrl) => {
  const url = new URL(claimUrl)

  if (!url.hash) {
    // custom host from dashboard
    const parsedParams = parseQueryParams(url.search)
    const chainId = parsedParams["c"]
    if (!chainId) {
      return EChains.polygon
    }
    return Number(chainId)
    
  } else {
    // old dashboard link or ssr link
    if (!url.search) {
      // old dashboard link
      const searchParams = url.hash.split('?')[1]
      const queryParams = parseQueryParams(searchParams)
      return Number(queryParams['c'])
    } else {
      // ssr link
      const parsedParams = parseQueryParams(url.search)
      const chainId = parsedParams["c"]
      if (!chainId) {
        return EChains.polygon
      }
      return Number(chainId)
      
    }
  }
}

export default getChainIdFromDashboardLink