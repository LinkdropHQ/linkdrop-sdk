type TGetClaimCodeFromDashboardLink = (claimUrl: string) => string

const getClaimCodeFromDashboardLink: TGetClaimCodeFromDashboardLink = (claimUrl) => {
  const url = new URL(claimUrl)
  if (!url.hash) {
    // custom url from dashboard
    return url.pathname
      .replace('/redeem/', '')
  
  } else {
    // old dashboard link or ssr link
    if (!url.search) {
      // old dashboard link
      return url.hash
        .replace('#', '')
        .replace('/redeem/', '')
        .split('?')[0]

    } else {
      // ssr link
      return url.hash
        .replace('#', '')
    }
  }
}

export default getClaimCodeFromDashboardLink