import { getClaimCodeFromDashboardLink } from "../../helpers"
import { expect} from "chai"

const linkDashboard = 'https://claim.linkdrop.io/#/redeem/7qu7bC43CVKv?src=d&c=137'
const linkP2P = 'https://staging.p2p.linkdrop.io/#/code?k=F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX&c=137&v=3&src=p2p&w=metamask&theme=light'

describe("getChainIdFromDashboardLink", () => {
  it("should return 7qu7bC43CVKv from dashboard link", () => {
    const result = getClaimCodeFromDashboardLink(linkDashboard)
    expect('7qu7bC43CVKv').to.equal(result)
  })

  it("should return F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX from p2p link", () => {
    const result = getClaimCodeFromDashboardLink(linkP2P)
    expect('F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX').to.equal(result)
  })
})