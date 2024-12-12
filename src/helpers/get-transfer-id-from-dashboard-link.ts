import { parseQueryParams } from '.'
import { TClaimLinkSource } from '../types'

type TGetTransferIdFromDashboardLink = (claimUrl: string) => string

const getTransferIdFromDashboardLink: TGetTransferIdFromDashboardLink = (claimUrl) => {
  const linkParts = claimUrl.split('/')
  const transferId = linkParts[linkParts.length - 1].split('?')[0]
  return transferId
}

export default getTransferIdFromDashboardLink