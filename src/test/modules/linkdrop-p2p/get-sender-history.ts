import { nativeTokenAddress } from "../../../configs"
import { LinkdropP2P, ClaimLink } from "../../.."
import randomBytes from 'randombytes'
import { expect } from "chai"

global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const apiKey = process.env.ZUPLO_API_KEY
const userAccount = '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537'
const token = nativeTokenAddress
const chainId = 11155111
const preparedLink = 'https://p2p.linkdrop.io/#/code?k=EZsMmw7XRDiFLAgBTfkLa6WafjVaikbH8YaGYaDrpd9Z&c=11155111&v=3&src=p2p&w=metamask&theme=light'

let linkdropP2P

beforeEach(() => {
  linkdropP2P = new LinkdropP2P({
    baseUrl,
    getRandomBytes,
    apiKey
  })
})

describe("LinkdropP2P getSenderHistory method", () => {
  it("should return correct baseUrl", async () => {
    const history = await linkdropP2P.getSenderHistory({
      sender: userAccount,
      chainId
    })
    expect(linkdropP2P.baseUrl).to.equal(baseUrl)
  })
})
