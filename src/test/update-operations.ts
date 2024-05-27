import updateOperations from "../helpers/update-operations"
import { expect} from "chai"
import { TClaimLinkItemOperation } from "../types"

const emptyOperations: TClaimLinkItemOperation[] = []
const operations: TClaimLinkItemOperation[] = [{
  status: "completed",
  receiver: '0xB4C3d57327D4fC9bcC3499963E21dB1A5435d537',
  timestamp: new Date().toString(),
  type: 'hello word',
  tx_hash: '0x5df54193939e9c9ed7cc2b694b8ec04abb3f2e326f5dc47a0957034dd26866d2'
}]
const uodatedOperations = [{
  status: "completed",
  receiver: '0xB4C3d57327D4fC9bcC3499963E21dB1A5435d537',
  timestamp: new Date().toString(),
  type: 'hello word',
  txHash: '0x5df54193939e9c9ed7cc2b694b8ec04abb3f2e326f5dc47a0957034dd26866d2'
}]

describe("updateOperations", () => {
  it("should return an emtpy array", () => {
    const result = updateOperations(emptyOperations)
    expect([]).to.deep.equal(result)
  })
  it("should return updated operations", () => {
    const result = updateOperations(operations)
    expect(uodatedOperations).to.deep.equal(result)
  })
})