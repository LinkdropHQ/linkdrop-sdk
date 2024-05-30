import { getVersionFromClaimUrl } from "../../helpers"
import { expect} from "chai"

const linkV3 = 'https://staging.p2p.linkdrop.io/#/code?k=F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX&c=137&v=3&src=p2p&w=metamask&theme=light'
const linkV2 = 'https://staging.p2p.linkdrop.io/#/code?k=F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX&c=137&v=2&src=p2p&w=metamask&theme=light'

describe("getVersionFromClaimUrl", () => {
  it("should return v3", () => {
    const result = getVersionFromClaimUrl(linkV3)
    expect(`3`).to.equal(result)
  })
  it("should return v2", () => {
    const result = getVersionFromClaimUrl(linkV2)
    expect(`2`).to.equal(result)
  })
})