import { parseQueryParams } from '.'
import { TClaimLinkSource } from '../types'

type TGetLinkSourceFromClaimUrl = (claimUrl: string) => TClaimLinkSource

const getLinkSourceFromClaimUrl: TGetLinkSourceFromClaimUrl = (claimUrl) => {
  const hashIndex = claimUrl.indexOf('#');
  const paramsString = claimUrl.substring(hashIndex + 1).split('?')[1]
  const parsedParams = parseQueryParams(paramsString)
  const linkSource = parsedParams["src"]
  if (!linkSource) {
    return 'p2p'
  }
  return linkSource as TClaimLinkSource
}

export default getLinkSourceFromClaimUrl