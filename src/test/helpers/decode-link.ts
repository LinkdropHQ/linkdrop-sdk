import {
  decodeLink,
  defineSignature
} from "../../helpers"
import { expect } from "chai"
import {
  ethers,
  decodeBase58,
  encodeBase58
} from 'ethers'

const linkKey = '0xe6e40b6d6cb11294b283a66a7fb2c7e53e56375ccd7f82398b95eaf2c1537162'
const encodedTransferId = encodeBase58('0xf4c0fdbdb207f2bdb268f4878aff806027515d8c')
const transferId = ethers.toBeHex(
  decodeBase58(
    encodedTransferId
  ),
  20
)

const claimCodeP2P = 'GYJTMLAHEBdEWQPiF5wV4fbR84X9zT1hPs5dkShWDcv5'
const coinbaseP2PLink = `https://host.com/claim?tk=code&k=${claimCodeP2P}&c=137&v=3&src=p2p`
const linkdropP2PLink = `https://host.com/#/code?k=${claimCodeP2P}&c=8453&v=3&src=p2p`

const linkRecoveredSig = '5HG4MvtAitkQqDmPrFTScQLaPCQBjVT9NyT8RNmqPSe1dVUbuDyFTQVysACrcvQXgzLvCkpW1vGWfFtyUqLd67tQz'
const linkRecoveredSigLength = 65
const coinbaseP2PLinkRecovered = `https://host.com/claim?tk=code&k=${claimCodeP2P}&sg=${linkRecoveredSig}&i=${encodedTransferId}&c=137&v=3&sgl=${linkRecoveredSigLength}&src=p2p`
const linkdropP2PLinkRecovered = `https://host.com/#/code?k=${claimCodeP2P}&sg=${linkRecoveredSig}&i=${encodedTransferId}&c=137&v=3&sgl=${linkRecoveredSigLength}&src=p2p`




const signatureDecoded = defineSignature(
  linkRecoveredSigLength,
  linkRecoveredSig
)

const coinbaseP2PLinkResult = {
  linkKey,
  transferId,
  chainId: 137,
  version: '3',
  senderSig: undefined,
  encryptionKey: undefined
}

const linkdropP2PLinkResult = {
  linkKey,
  transferId,
  chainId: 8453,
  version: '3',
  senderSig: undefined,
  encryptionKey: undefined
}


const coinbaseP2PLinkRecoveredResult = {
  linkKey,
  transferId,
  chainId: 137,
  version: '3',
  senderSig: signatureDecoded,
  encryptionKey: undefined
}

const linkdropP2PLinkRecoveredResult = {
  linkKey,
  transferId,
  chainId: 137,
  version: '3',
  senderSig: signatureDecoded,
  encryptionKey: undefined
}


describe("decodeLink", () => {
  it(`should return expected object for ${coinbaseP2PLink}`, () => {
    const result = decodeLink(coinbaseP2PLink)
    expect(coinbaseP2PLinkResult).to.deep.equal(result)
  })

  it(`should return expected object for ${linkdropP2PLink}`, () => {
    const result = decodeLink(linkdropP2PLink)
    expect(linkdropP2PLinkResult).to.deep.equal(result)
  })

  it(`should return expected object for ${coinbaseP2PLinkRecovered}`, () => {
    const result = decodeLink(coinbaseP2PLinkRecovered)
    expect(coinbaseP2PLinkRecoveredResult).to.deep.equal(result)
  })

  it(`should return expected object for ${linkdropP2PLinkRecovered}`, () => {
    const result = decodeLink(linkdropP2PLinkRecovered)
    expect(linkdropP2PLinkRecoveredResult).to.deep.equal(result)
  })
})