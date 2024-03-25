import { parseQueryParams } from '.'
import { EChains } from '../types'

type TGetChainIdFromDashboardLink = (claimUrl: string) => EChains

const getChainIdFromDashboardLink: TGetChainIdFromDashboardLink = (claimUrl) => {
  const paramsString = claimUrl.split('?')[1]
  const parsedParams = parseQueryParams(paramsString)
  const chainId = parsedParams["c"]
  if (!chainId) {
    return EChains.polygon
  }
  return Number(chainId) as EChains
}

export default getChainIdFromDashboardLink