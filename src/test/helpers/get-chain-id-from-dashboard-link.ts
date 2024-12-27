import { getChainIdFromDashboardLink } from "../../helpers"
import { expect} from "chai"
import { EChains } from "../../types"

const dashboardLinkPolygon = 'https://claim.linkdrop.io/#/redeem/7qu7bC43CVKv?src=d&c=137'
const dashboardLinkBase = 'https://claim.linkdrop.io/#/redeem/7qu7bC43CVKv?src=d&c=8453'

const dashboardCustomHostLinkBase = 'https://customhost.io/redeem/7qu7bC43CVKv?src=d&c=8453'
const dashboardCustomHostLinkPolygon = 'https://customhost.io/redeem/7qu7bC43CVKv?src=d&c=137'

const dashboardSSRLinkBase = 'https://dev.claim.linkdrop.io/redeem/0xD875346dD38000e9919b83e21556520F94feCcaa?src=d&c=8453#7BRRj83EsMLL'
const dashboardSSRLinkPolygon = 'https://dev.claim.linkdrop.io/redeem/0xD875346dD38000e9919b83e21556520F94feCcaa?src=d&c=137#7BRRj83EsMLL'

describe("getChainIdFromDashboardLink", () => {
  it(`should return 137 for dashboard old format link ${dashboardLinkPolygon}`, () => {
    const result = getChainIdFromDashboardLink(dashboardLinkPolygon)
    expect(EChains.polygon).to.equal(result)
  })

  it(`should return 8453 for dashboard old format link ${dashboardLinkBase}`, () => {
    const result = getChainIdFromDashboardLink(dashboardLinkBase)
    expect(EChains.base).to.equal(result)
  })

  it(`should return 137 for dashboard custom host link ${dashboardCustomHostLinkPolygon}`, () => {
    const result = getChainIdFromDashboardLink(dashboardCustomHostLinkPolygon)
    expect(EChains.polygon).to.equal(result)
  })

  it(`should return 8453 for dashboard custom host link ${dashboardCustomHostLinkBase}`, () => {
    const result = getChainIdFromDashboardLink(dashboardCustomHostLinkBase)
    expect(EChains.base).to.equal(result)
  })


  it(`should return 137 for dashboard SSR link ${dashboardSSRLinkPolygon}`, () => {
    const result = getChainIdFromDashboardLink(dashboardSSRLinkPolygon)
    expect(EChains.polygon).to.equal(result)
  })

  it(`should return 8453 for dashboard SSR link ${dashboardSSRLinkBase}`, () => {
    const result = getChainIdFromDashboardLink(dashboardSSRLinkBase)
    expect(EChains.base).to.equal(result)
  })
})