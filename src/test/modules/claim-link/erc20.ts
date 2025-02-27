import { LinkdropSDK } from "../../.."
import { expect } from "chai"
import randomBytes from 'randombytes'
import { beforeEach } from "mocha"
import { nativeTokenAddress } from "../../../configs"
global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const apiKey = '<ZUPLO_KEY>'
const userAccount = '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537'
const token = '0xb8D98a102b0079B69FFbc760C8d857A31653e56e'
const tokenUSDC = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'

const amount = '100000000000000000000000000'
const amountUSDC = '100000000'

const chainId = 8453

let linkdropSDK

beforeEach(() => {
  linkdropSDK = new LinkdropSDK({
    baseUrl,
    getRandomBytes,
    apiKey
  })
})

describe("LinkdropSDK ERC20 link creation", () => {
  it("should create a valid class instance with correct feeToken, feeAuthorization and feeAmount", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link).to.have.any.keys('feeToken', 'feeAuthorization', 'feeAmount');
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })

  it("should create a valid class instance with feeToken as native token of network", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link.feeToken).to.equal(nativeTokenAddress)
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })

  it("should create a valid class instance with feeAmount as 33300000000000 for ERC20 token", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link.feeAmount).to.equal('33300000000000')
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })
})



describe("LinkdropSDK link creation", () => {
  it("should create a valid link", async () => {
      const link = await linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token: tokenUSDC,
        tokenType: 'ERC20',
        amount: amountUSDC
      })
  })
})