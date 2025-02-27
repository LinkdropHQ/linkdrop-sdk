import { LinkdropSDK } from "../../.."
import { expect } from "chai"
import randomBytes from 'randombytes'
import { beforeEach } from "mocha"
global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const apiKey = '<ZUPLO_KEY>'
const userAccount = '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537'
const token = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'
const amount = '10000'
const chainId = 8453
let linkdropSDK

beforeEach(() => {
  linkdropSDK = new LinkdropSDK({
    baseUrl,
    getRandomBytes,
    apiKey
  })
})

describe("LinkdropSDK StableCoin link creation", () => {
  it("should create a valid class instance with correct token address", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount: '10000'
      }).then(link => {
        expect(link.token).to.equal(token)
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })

  it("should create a valid class instance with correct chainId", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount: '10000'
      }).then(link => {
        expect(link.chainId).to.equal(chainId)
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })

  it("should create a valid class instance with correct tokenType", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount: '10000'
      }).then(link => {
        expect(link.tokenType).to.equal('ERC20')
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })

  it("should create a valid class instance with correct amount", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link.amount).to.equal(amount)
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })

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

  it("should create a valid class instance with feeToken same as token", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link.feeToken).to.equal(token)
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })

  it("should create a valid class instance with feeAmount as 0 for stablecoins", () => {
    return new Promise(function (resolve, reject) {
      linkdropSDK.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).then(link => {
        expect(link.feeAmount).to.equal('0')
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })
})