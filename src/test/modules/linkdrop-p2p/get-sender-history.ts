import { LinkdropSDK, ClaimLink } from "../../.."
import randomBytes from 'randombytes'
import { expect } from "chai"

global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const apiKey = process.env.ZUPLO_API_KEY
const userAccount = '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537'
const chainId = 11155111

let linkdropSDK

beforeEach(() => {
  linkdropSDK = new LinkdropSDK({
    baseUrl,
    getRandomBytes,
    apiKey
  })
})

describe("LinkdropSDK getSenderHistory method", () => {
  it("should return correct baseUrl", async () => {
    const history = await linkdropSDK.getSenderHistory({
      sender: userAccount,
      chainId
    })
    expect(linkdropSDK.baseUrl).to.equal(baseUrl)
  })
})
