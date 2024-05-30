import { LinkdropP2P, ClaimLink } from "../../.."
import { expect } from "chai"
import randomBytes from 'randombytes'
import { beforeEach } from "mocha"
import { nativeTokenAddress } from "../../../configs"
import { ethers } from "ethers"
global.fetch = require('node-fetch')
const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
const baseUrl = 'https://localhost:3000'
const apiKey = process.env.ZUPLO_API_KEY
const userAccount = '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537'
const token = nativeTokenAddress
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
  it("should throw an error that nativeTokenAddress is not a valid ERC20 token", () => {
    const amount = '10001'
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'ERC20',
        amount
      }).catch(err => {
        expect(err.error).to.be.equal('INVALID_ERC20_TOKEN')
        resolve(true)
      })
    })
  })

  it("should throw an error that amount is less than min limit", () => {
    const amount = '10001'
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount
      }).catch(err => {
        expect(err.error).to.be.equal('DEPOSIT_AMOUNT_LESS_THAN_MIN')
        resolve(true)
      })
    })
  })

  it("should throw an error that amount is more than max limit", () => {
    const amount = '1000000000000000000'
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount
      }).catch(err => {
        expect(err.error).to.be.equal('DEPOSIT_AMOUNT_EXCEEDED')
        resolve(true)
      })
    })
  })


  it("should return a corrent claim link", () => {
    const amount = '50000000000000000'
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount
      })
      .then(link => {
        expect(link.tokenType).to.be.equal('NATIVE')
        resolve(true)
      })
    })
  })

  it("should return a corrent claim link with total amount equals to feeAmount + amount", () => {
    const amount = '50000000000000000'
    return new Promise(function (resolve, reject) {
      linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount
      })
      .then(link => {
        const totalAmount = BigInt(link.feeAmount) + BigInt(amount)
        expect(link.totalAmount).to.be.equal(totalAmount.toString())
        resolve(true)
      })
    })
  })

  it("should return a corrent claim link with no possibility to use depositWithAuthorization method", () => {
    const amount = '50000000000000000'
    return new Promise(async function (resolve, reject) {
      const link: ClaimLink = await linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount
      })

      const isDepositWithAuthorizationAvailable = link.isDepositWithAuthorizationAvailable(token)
      expect(isDepositWithAuthorizationAvailable).to.be.equal(false)
      resolve(true)
    })
  })

  it("should return a corrent claim link and fail with getLink method", () => {
    const amount = '50000000000000000'
    return new Promise(async function (resolve, reject) {
      const link: ClaimLink = await linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount
      })
      link.getStatus().catch(err => {
        expect(err.error).to.be.equal('ESCROW_PAYMENT_NOT_FOUND')
      })
      resolve(true)
    })
  })


  it("should return a corrent claim link and fail with redeem method", () => {
    const amount = '50000000000000000'
    return new Promise(async function (resolve, reject) {
      const link: ClaimLink = await linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount
      })
      link.redeem(userAccount).catch(err => {
        expect(err.message).to.be.equal('Tokens should be deposited before redeem')
        resolve(true)
      })
    })
  })

  it("should return a corrent claim link and fail with updateAmount method with DEPOSIT_AMOUNT_EXCEEDED error", () => {
    const initialAmount = '50000000000000000'
    const updatedAmount = '10000000000000000000'

    return new Promise(async function (resolve, reject) {
      const link: ClaimLink = await linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount: initialAmount
      })
      link.updateAmount(updatedAmount).catch(err => {
        console.log({ err })
        expect(err.error).to.be.equal('DEPOSIT_AMOUNT_EXCEEDED')
        resolve(true)
      })
    })
  })

  it("should return a corrent claim link and fail with updateAmount method with DEPOSIT_AMOUNT_LESS_THAN_MIN error", () => {
    const initialAmount = '50000000000000000'
    const updatedAmount = '10000'

    return new Promise(async function (resolve, reject) {
      const link: ClaimLink = await linkdropP2P.createClaimLink({
        from: userAccount,
        chainId,
        token,
        tokenType: 'NATIVE',
        amount: initialAmount
      })
      link.updateAmount(updatedAmount).catch(err => {
        console.log({ err })
        expect(err.error).to.be.equal('DEPOSIT_AMOUNT_LESS_THAN_MIN')
        resolve(true)
      })
    })
  })


  // check with link created with p2p app

  // check dashboard links


    // redeem: [Function (anonymous)],
    // updateAmount: [Function (anonymous)],




    
  // it("should create a valid class instance with feeAmount as 0 for stablecoins", () => {
  //   return new Promise(function (resolve, reject) {
  //     linkdropP2P.createClaimLink({
  //       from: userAccount,
  //       chainId: 137,
  //       token,
  //       tokenType: 'ERC20',
  //       amount
  //     }).then(link => {
  //       console.log({ link })
  //       expect(link.feeAmount).to.equal('100000000000000000')
  //       resolve(true)
  //     }).catch(err => {
  //       console.log({ err })
  //       reject(err)
  //     })
  //   })
  // })
})