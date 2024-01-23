import { parseQueryParams } from '.'
import { TClaimLinkSource } from '../types'

type TGetClaimCodeFromDashboardLink = (claimUrl: string) => string

const getClaimCodeFromDashboardLink: TGetClaimCodeFromDashboardLink = (claimUrl) => {
  const linkParts = claimUrl.split('/')
  const claimCode = linkParts[linkParts.length - 1].split('?')[0]
  return claimCode
}

export default getClaimCodeFromDashboardLink