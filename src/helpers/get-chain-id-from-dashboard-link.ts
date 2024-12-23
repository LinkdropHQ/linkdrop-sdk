import { parseQueryParams } from '.'
import { EChains } from '../types'

type TGetChainIdFromDashboardLink = (claimUrl: string) => EChains

const getChainIdFromDashboardLink: TGetChainIdFromDashboardLink = (claimUrl) => {
  const url = new URL(claimUrl)
  const parsedParams = parseQueryParams(url.search.replace('?', ''))
  const chainId = parsedParams["c"]
  if (!chainId) {
    return EChains.polygon
  }
  return Number(chainId) as EChains
}

export default getChainIdFromDashboardLink