import { decodeLink } from "../../helpers"
import { expect } from "chai"
import { ethers, decodeBase58, encodeBase58 } from 'ethers'


const data1 = 'http://localhost:3000/#/code?k=GYJTMLAHEBdEWQPiF5wV4fbR84X9zT1hPs5dkShWDcv5&c=137&v=3&src=p2p'

const linkKey = '0xe6e40b6d6cb11294b283a66a7fb2c7e53e56375ccd7f82398b95eaf2c1537162'
const transferId = ethers.toBeHex(
  decodeBase58(
    encodeBase58('0xf4c0fdbdb207f2bdb268f4878aff806027515d8c')
  ),
  20
)

const result1 = {
  linkKey,
  transferId,
  chainId: 137,
  version: '3',
  senderSig: undefined
}

describe("decodeLink", () => {
  it("should return expected object", () => {
    const result = decodeLink(data1)
    expect(result1).to.deep.equal(result)
  })
})