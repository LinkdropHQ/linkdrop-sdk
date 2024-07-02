import { LinkdropP2P } from "../../../"
import { expect } from "chai"
import randomBytes from 'randombytes'
import { beforeEach } from "mocha"
global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const deployment = 'CBW'

describe("LinkdropP2P initialization", () => {
  it("should return correct baseUrl", () => {
    const linkdropP2P = new LinkdropP2P({
      baseUrl,
      getRandomBytes
    })
    expect(linkdropP2P.baseUrl).to.equal(baseUrl)
  })

  it("should return CBW deployment", () => {
    const linkdropP2P = new LinkdropP2P({
      baseUrl,
      getRandomBytes,
      deployment
    })
    expect(linkdropP2P.deployment).to.equal('CBW')
  })

  it("should return undefined apiUrl", () => {
    const linkdropP2P = new LinkdropP2P({
      baseUrl,
      getRandomBytes,
      deployment
    })
    expect(linkdropP2P.apiUrl).to.equal(undefined)
  })
})