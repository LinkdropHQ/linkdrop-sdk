import {
  getClaimCodeFromDashboardLink
} from "../../helpers"
import { expect} from "chai"

const claimCodeDashboard = '7qu7bC43CVKv'

// const claimCodeP2P = '2Q7gnE4aiyXJqwxePHeEh9wLo27gKXnBrdxtY33DBN58'
// const coinbaseP2PLink = `https://host.com/claim?tk=code&k=${claimCodeP2P}&c=137&v=3&src=p2p`
// const linkdropP2PLink = `https://host.com/#/code?k=${claimCodeP2P}&c=137&v=3&src=p2p`

const dashboardLinkPolygon = `https://claim.linkdrop.io/#/redeem/${claimCodeDashboard}?src=d&c=137`
const dashboardCustomHostLinkPolygon = `https://customhost.io/redeem/${claimCodeDashboard}?src=d&c=137`
const dashboardSSRLinkPolygon = `https://dev.claim.linkdrop.io/redeem/0xD875346dD38000e9919b83e21556520F94feCcaa?src=d&c=137#${claimCodeDashboard}`



describe("getClaimCodeFromDashboardLink", () => {
  it(`should return ${claimCodeDashboard} from dashboard link ${dashboardLinkPolygon}`, () => {
    const result = getClaimCodeFromDashboardLink(dashboardLinkPolygon)
    expect(claimCodeDashboard).to.equal(result)
  })

  it(`should return ${claimCodeDashboard} from custom host dashboard link ${dashboardCustomHostLinkPolygon}`, () => {
    const result = getClaimCodeFromDashboardLink(dashboardCustomHostLinkPolygon)
    expect(claimCodeDashboard).to.equal(result)
  })

  it(`should return ${claimCodeDashboard} from SSR dashboard link ${dashboardSSRLinkPolygon}`, () => {
    const result = getClaimCodeFromDashboardLink(dashboardSSRLinkPolygon)
    expect(claimCodeDashboard).to.equal(result)
  })
})