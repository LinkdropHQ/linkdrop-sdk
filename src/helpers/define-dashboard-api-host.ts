import { EChains } from '../types'
import { dashboardApiUrl, dashboardTestnetsApiUrl } from '../configs'

type TDefineDashboardApiHost = (
  chainId: EChains
) => string

const defineDashboardApiHost: TDefineDashboardApiHost = (
  chainId
) => {
  switch (chainId) {
    case EChains.polygon:
    case EChains.base:
      return dashboardApiUrl
    case EChains.baseGoerli:
    case EChains.mumbai:
      return dashboardTestnetsApiUrl
    default:
      return dashboardApiUrl
  }
}

export default defineDashboardApiHost