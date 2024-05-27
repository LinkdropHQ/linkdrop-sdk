import getLinkSourcsFromClaimUrl from "../helpers/get-link-source-from-claim-url"
import { expect} from "chai"

const linkP2P = 'https://staging.p2p.linkdrop.io/#/code?k=F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX&c=137&v=3&src=p2p&w=metamask&theme=light'
const linkDashboard = 'https://staging.p2p.linkdrop.io/#/code?k=F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX&c=137&v=2&src=d&w=metamask&theme=light'

describe("getLinkSourcsFromClaimUrl", () => {
  it("should return p2p", () => {
    const result = getLinkSourcsFromClaimUrl(linkP2P)
    expect(`p2p`).to.equal(result)
  })
  it("should return d", () => {
    const result = getLinkSourcsFromClaimUrl(linkDashboard)
    expect(`d`).to.equal(result)
  })
})