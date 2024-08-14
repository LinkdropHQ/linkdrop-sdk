import {
  dashboardApiUrl,
  devDashboardApiUrl
} from '../configs'

type TDefineDashboardApiHost = (
  claimLink: string
) => string

const defineDashboardApiHost: TDefineDashboardApiHost = (
  claimLink
) => {
  if (claimLink.includes('dev.')) {
    return devDashboardApiUrl
  }
  return dashboardApiUrl
}

export default defineDashboardApiHost