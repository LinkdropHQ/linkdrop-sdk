import { defineIfEscrowAddressIsCorrect } from "../../helpers"
import { expect} from "chai"
import * as configs from '../../configs'

describe("defineIfEscrowAddressIsCorrect", () => {
  it("should return true", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.cbwEscrowContract,
      'CBW'
    )
    expect(true).to.equal(result)
  })

  it("should return false", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.cbwEscrowContract,
      'LD'
    )
    expect(false).to.equal(result)
  })

  it("should return true", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContract,
      'LD'
    )
    expect(true).to.equal(result)
  })
})