import { parseQueryParams } from '.'

type TGetClaimCodeFromDashboardLink = (claimUrl: string) => string

const getClaimCodeFromDashboardLink: TGetClaimCodeFromDashboardLink = (claimUrl) => {

  if (claimUrl.includes('redeem')) {
    if (claimUrl.includes('?src=d#')) {
      // new format
      const linkParts = claimUrl.split('#')
      return linkParts[linkParts.length - 1]

    } else {
      // old format

      const linkParts = claimUrl.split('/')
      const claimCode = linkParts[linkParts.length - 1].split('?')[0]
      return claimCode
    }

  } else {
    const paramsString = claimUrl.split('?')[1]
    const parsedParams = parseQueryParams(paramsString)
    const claimCode = parsedParams["k"]
    return claimCode
  }
}

export default getClaimCodeFromDashboardLink