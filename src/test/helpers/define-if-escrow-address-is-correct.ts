import { defineIfEscrowAddressIsCorrect } from "../../helpers"
import { expect} from "chai"
import * as configs from '../../configs'

describe("defineIfEscrowAddressIsCorrect", () => {
  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.cbwEscrowContract,
      'ERC20',
      'CBW'
    )
    expect(true).to.equal(result)
  })

  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContractNFT,
      'ERC1155',
      'LD'
    )
    expect(true).to.equal(result)
  })

  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContractNFT,
      'ERC721',
      'LD'
    )
    expect(true).to.equal(result)
  })

  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContract,
      'ERC20',
      'LD'
    )
    expect(true).to.equal(result)
  })
})