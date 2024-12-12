import { parseQueryParams } from '.'
import { TClaimLinkSource } from '../types'

type TGetLinkSourceFromClaimUrl = (claimUrl: string) => TClaimLinkSource

const getLinkSourceFromClaimUrl: TGetLinkSourceFromClaimUrl = (claimUrl) => {
  // const paramsString = claimUrl.split('?')[1]
  // const parsedParams = parseQueryParams(paramsString)
  // const linkSource = parsedParams["src"]
  
  // if (!linkSource) {
  //   return 'p2p'
  // }
  // return linkSource as TClaimLinkSource


  if (claimUrl.includes('src=d')) {
    return 'd'
  }

  return 'p2p'
}

export default getLinkSourceFromClaimUrl