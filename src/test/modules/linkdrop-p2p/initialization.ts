import { LinkdropSDK } from "../../../"
import { expect } from "chai"
import randomBytes from 'randombytes'
global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const deployment = 'CBW'
const apiKey = '<ZUPLO_KEY>'

describe("LinkdropSDK initialization", () => {
  it("should return correct baseUrl", () => {
    const linkdropSDK = new LinkdropSDK({
      baseUrl,
      getRandomBytes,
      apiKey
    })
    expect(linkdropSDK.baseUrl).to.equal(baseUrl)
  })

  it("should return CBW deployment", () => {
    const linkdropSDK = new LinkdropSDK({
      baseUrl,
      getRandomBytes,
      deployment,
      apiKey
    })
    expect(linkdropSDK.deployment).to.equal('CBW')
  })

  it("should return undefined apiUrl", () => {
    const linkdropSDK = new LinkdropSDK({
      baseUrl,
      getRandomBytes,
      deployment,
      apiKey
    })
    expect(linkdropSDK.apiUrl).to.equal(undefined)
  })
})