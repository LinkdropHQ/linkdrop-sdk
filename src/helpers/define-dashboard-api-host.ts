import { dashboardApiUrl } from '../configs'

type TDefineDashboardApiHost = () => string

const defineDashboardApiHost: TDefineDashboardApiHost = () => {
  return dashboardApiUrl
}

export default defineDashboardApiHost