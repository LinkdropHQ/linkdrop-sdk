import { TClaimLinkSource } from '../types'

type TGetLinkSourceFromClaimUrl = (claimUrl: string) => TClaimLinkSource

const getLinkSourceFromClaimUrl: TGetLinkSourceFromClaimUrl = (claimUrl) => {
  if (claimUrl.includes('src=d')) {
    return 'd'
  }

  return 'p2p'
}

export default getLinkSourceFromClaimUrl