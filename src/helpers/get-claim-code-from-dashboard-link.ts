import { parseQueryParams } from '.'
import { TClaimLinkSource } from '../types'

type TGetClaimCodeFromDashboardLink = (claimUrl: string) => string

const getClaimCodeFromDashboardLink: TGetClaimCodeFromDashboardLink = (claimUrl) => {
  if (claimUrl.includes('redeem')) {
    const linkParts = claimUrl.split('/')
    const claimCode = linkParts[linkParts.length - 1].split('?')[0]
    return claimCode
  } else {
    const paramsString = claimUrl.split('?')[1]
    const parsedParams = parseQueryParams(paramsString)
    const claimCode = parsedParams["k"]
    return claimCode
  }
}

export default getClaimCodeFromDashboardLink