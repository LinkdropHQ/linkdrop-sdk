import defineDomain from "../../helpers/define-domain"
import { expect} from "chai"
import { EChains, ETokenAddress } from "../../types"
import {
  polygonUSDCBridged,
  polygonUSDC,
  optimismUSDC,
  avalancheUSDC,
  arbitrumUSDC,
  baseGoerliUSDC,
  baseUSDC,
  sepoliaUSDC
} from '../../domains'

describe("defineDomain", () => {
  it("should return polygon usdc bridged domain", () => {
    const result = defineDomain(
      EChains.polygon,
      ETokenAddress.usdcBridgedPolygon
    )
    expect(polygonUSDCBridged).to.deep.equal(result)
  })

  it("should return polygon usdc domain", () => {
    const result = defineDomain(
      EChains.polygon,
      ETokenAddress.usdcPolygon
    )
    expect(polygonUSDC).to.deep.equal(result)
  })

  it("should return arbitrum usdc domain", () => {
    const result = defineDomain(
      EChains.arbitrum,
      ETokenAddress.usdcArbitrum
    )
    expect(arbitrumUSDC).to.deep.equal(result)
  })

  it("should return optimism usdc domain", () => {
    const result = defineDomain(
      EChains.optimism,
      ETokenAddress.usdcOptimism
    )
    expect(optimismUSDC).to.deep.equal(result)
  })

  it("should return avalanche usdc domain", () => {
    const result = defineDomain(
      EChains.avalanche,
      ETokenAddress.usdcAvalanche
    )
    expect(avalancheUSDC).to.deep.equal(result)
  })

  it("should return base goerli usdc domain", () => {
    const result = defineDomain(
      EChains.baseGoerli,
      ETokenAddress.usdcBaseGoerli
    )
    expect(baseGoerliUSDC).to.deep.equal(result)
  })

  it("should return base usdc domain", () => {
    const result = defineDomain(
      EChains.base,
      ETokenAddress.usdcBase
    )
    expect(baseUSDC).to.deep.equal(result)
  })

  it("should return sepolia usdc domain", () => {
    const result = defineDomain(
      EChains.sepolia,
      ETokenAddress.usdcSepolia
    )
    expect(sepoliaUSDC).to.deep.equal(result)
  })

  it("should return null as domain", () => {
    const result = defineDomain(
      EChains.base,
      ETokenAddress.usdcSepolia
    )
    expect(null).to.equal(result)
  })
})