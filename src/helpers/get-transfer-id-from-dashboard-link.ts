import { getClaimCodeFromDashboardLink } from '.'
import { ethers } from 'ethers'

type TGetTransferIdFromDashboardLink = (claimUrl: string) => string

const getTransferIdFromDashboardLink: TGetTransferIdFromDashboardLink = (claimUrl) => {
  // old format dashboard link, ssr link or custom link
  const url = new URL(claimUrl)

  if (!url.hash) {
    // custom host from dashboard
    const claimCode = getClaimCodeFromDashboardLink(claimUrl)
    const linkKey = ethers.id(claimCode)
    return new ethers.Wallet(linkKey).address
  } else {
    // old dashboard link or ssr link
    if (!url.search) {
      // old dashboard link
      const claimCode = getClaimCodeFromDashboardLink(claimUrl)
      const linkKey = ethers.id(claimCode)
      return new ethers.Wallet(linkKey).address
    } else {
      // ssr link
      return url.pathname
        .replace('/redeem/', '')
    }
  }
}

export default getTransferIdFromDashboardLink