import { getTransferIdFromDashboardLink } from "../../helpers"
import { expect} from "chai"

const claimCode = '7BRRj83EsMLL'
const transferId = '0xD875346dD38000e9919b83e21556520F94feCcaa'
const dashboardLinkBase = `https://claim.linkdrop.io/#/redeem/${claimCode}?src=d&c=8453`
const dashboardCustomHostLinkBase = `https://customhost.io/redeem/${claimCode}?src=d&c=8453`
const dashboardSSRLinkBase = `https://dev.claim.linkdrop.io/redeem/${transferId}?src=d&c=8453#${claimCode}`

describe("getTransferIdFromDashboardLink", () => {
  it(`should return ${transferId} for dashboard old format link ${dashboardLinkBase}`, () => {
    const result = getTransferIdFromDashboardLink(dashboardLinkBase)
    expect(transferId).to.equal(result)
  })

  it(`should return ${transferId} for dashboard custom host link ${dashboardCustomHostLinkBase}`, () => {
    const result = getTransferIdFromDashboardLink(dashboardCustomHostLinkBase)
    expect(transferId).to.equal(result)
  })

  it(`should return ${transferId} for dashboard SSR link ${dashboardSSRLinkBase}`, () => {
    const result = getTransferIdFromDashboardLink(dashboardSSRLinkBase)
    expect(transferId).to.equal(result)
  })
})