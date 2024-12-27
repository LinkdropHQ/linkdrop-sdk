import { encodeLink } from "../../helpers"
import { expect } from "chai"
import { baseUrl } from "../../configs"

const claimHost1 = baseUrl
const claimHost2 = 'https://blablabla.com'

const { address, privateKey } = {
  address: '0xf4c0fdbdb207f2bdb268f4878aff806027515d8c',
  privateKey: '0xe6e40b6d6cb11294b283a66a7fb2c7e53e56375ccd7f82398b95eaf2c1537162'
}

const link1 = {
  sender: '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537',
  linkKey: privateKey,
  transferId: address,
  chainId: 137,
  version: '3'
}

describe("encodeLink", () => {
  it("should return expected string", async () => {
    // const keyPair = await generateKeypair(this.getRandomBytes)
    const result = encodeLink(
      claimHost1,
      link1
    )
    expect(`http://localhost:3000/#/code?k=GYJTMLAHEBdEWQPiF5wV4fbR84X9zT1hPs5dkShWDcv5&c=137&v=3&src=p2p`).to.equal(result)
  })

  it("should return expected string", () => {
    const result = encodeLink(
      claimHost2,
      link1
    )
    expect(`https://blablabla.com/#/code?k=GYJTMLAHEBdEWQPiF5wV4fbR84X9zT1hPs5dkShWDcv5&c=137&v=3&src=p2p`).to.equal(result)
  })
})