import { defineTokenSymbol } from "../../helpers"
import { expect} from "chai"
import { EChains, ETokenAddress, ETokenSymbol } from "../../types"

const linkDashboard = 'https://claim.linkdrop.io/#/redeem/7qu7bC43CVKv?src=d&c=137'
const linkP2P = 'https://staging.p2p.linkdrop.io/#/code?k=F3ji8LubxF75AdzxyhToQxGFd8tF1FCzdQnBqPS13YeX&c=137&v=3&src=p2p&w=metamask&theme=light'

describe("defineTokenSymbol", () => {
  it("should return USDC", () => {
    const result = defineTokenSymbol(
      'ERC20',
      EChains.polygon,
      ETokenAddress.usdcPolygon
    )
    expect(ETokenSymbol.usdc).to.equal(result)
  })

  it("should return USDCe", () => {
    const result = defineTokenSymbol(
      'ERC20',
      EChains.polygon,
      ETokenAddress.usdcBridgedPolygon
    )
    expect(ETokenSymbol.usdce).to.equal(result)
  })

})