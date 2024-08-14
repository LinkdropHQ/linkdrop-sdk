import { defineIfEscrowAddressIsCorrect } from "../../helpers"
import { expect} from "chai"
import * as configs from '../../configs'

describe("defineIfEscrowAddressIsCorrect", () => {
  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.cbwEscrowContract,
      'ERC20',
      'CBW',
      8453
    )
    expect(true).to.equal(result)
  })

  it("should return false for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.cbwEscrowContract,
      'ERC20',
      'LD',
      8453
    )
    expect(false).to.equal(result)
  })

  it("should return false for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContract,
      'ERC721',
      'LD',
      8453
    )
    expect(false).to.equal(result)
  })

  it("should return false for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContract,
      'ERC1155',
      'LD',
      8453
    )
    expect(false).to.equal(result)
  })

  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContractNFT,
      'ERC1155',
      'LD',
      8453
    )
    expect(true).to.equal(result)
  })

  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContractNFT,
      'ERC721',
      'LD',
      8453
    )
    expect(true).to.equal(result)
  })

  it("should return true for cbwEscrowContract", () => {
    const result = defineIfEscrowAddressIsCorrect(
      configs.mainEscrowContract,
      'ERC20',
      'LD',
      8453
    )
    expect(true).to.equal(result)
  })
})