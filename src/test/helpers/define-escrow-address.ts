import { defineEscrowAddress } from "../../helpers"
import { expect} from "chai"
import * as configs from '../../configs'
import { EChains } from "../../types"

describe("defineEscrowAddress", () => {
  it("should return escrow for Coinbase", () => {
    const result = defineEscrowAddress(
      EChains.arbitrum,
      'ERC20',
      'CBW'
    )
    expect(configs.cbwEscrowContract).to.equal(result)
  })

  it("should return null", () => {
    const result = defineEscrowAddress(
      null,
      'ERC20',
      'CBW'
    )
    expect(null).to.equal(result)
  })

  it("should return null", () => {
    const result = defineEscrowAddress(
      EChains.arbitrum,
      'ERC20',
      'LD'
    )
    expect(configs.mainEscrowContract).to.equal(result)
  })
  
})