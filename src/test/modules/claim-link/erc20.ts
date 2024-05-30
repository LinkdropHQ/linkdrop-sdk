import { LinkdropP2P } from "../../.."
import { expect } from "chai"
import randomBytes from 'randombytes'
import { beforeEach } from "mocha"
import { nativeTokenAddress } from "../../../configs"
global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const apiKey = process.env.ZUPLO_API_KEY
const userAccount = '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537'
const token = '0x08210f9170f89ab7658f0b5e3ff39b0e03c594d4'
const amount = '10001'
const chainId = 11155111

let linkdropP2P

beforeEach(() => {
  linkdropP2P = new LinkdropP2P({
    baseUrl,
    getRandomBytes,
    apiKey
  })
})

describe("LinkdropP2P link creation", () => {
  it("should create a valid class instance with correct feeToken, feeAuthorization and feeAmount", () => {
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link).to.have.any.keys('feeToken', 'feeAuthorization', 'feeAmount');
        resolve(true)
      }).catch(err => {
        console.log({ err })
        reject(err)
      })
    })
  })

  it("should create a valid class instance with feeToken as native token of network", () => {
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link.feeToken).to.equal(nativeTokenAddress)
        resolve(true)
      }).catch(err => {
        console.log({ err })
        reject(err)
      })
    })
  })

  it("should create a valid class instance with feeAmount as 0 for stablecoins", () => {
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        console.log({ link })
        expect(link.feeAmount).to.equal('33300000000000')
        resolve(true)
      }).catch(err => {
        console.log({ err })
        reject(err)
      })
    })
  })
})