// import { LinkdropSDK } from "../../.."
// import { expect } from "chai"
// import randomBytes from 'randombytes'
// import { beforeEach } from "mocha"
// import { nativeTokenAddress } from "../../../configs"
// global.fetch = require('node-fetch')
// const getRandomBytes = (length: number) => new Uint8Array(randomBytes(length)) 
// const baseUrl = 'https://localhost:3000'
// const apiKey = process.env.ZUPLO_API_KEY
// const userAccount = '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537'
// const token = '0x2b7ca50f95e830cd7f47f42f156a6934906e3957'
// const tokenId = '4'

// const chainId = 11155111

// let linkdropSDK

// beforeEach(() => {
//   linkdropSDK = new LinkdropSDK({
//     baseUrl,
//     getRandomBytes,
//     apiKey
//   })
// })

// describe("LinkdropSDK ERC721 link creation", () => {
//   it("should create a valid class instance with correct feeToken, feeAuthorization and feeAmount", () => {
//     return new Promise(function (resolve, reject) {
//       linkdropSDK.createClaimLink({
//         from: userAccount,
//         chainId,
//         token,
//         tokenType: 'ERC721',
//         tokenId
//       }).then(link => {
//         expect(link).to.have.any.keys('feeToken', 'feeAuthorization', 'feeAmount');
//         resolve(true)
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   })

//   it("should fail with no tokenId", () => {
//     return new Promise(function (resolve, reject) {
//       linkdropSDK.createClaimLink({
//         from: userAccount,
//         chainId,
//         token,
//         tokenType: 'ERC721'
//       }).catch(err => {
//         expect(err.error).to.be.equal('TOKEN_ID_NOT_PROVIDED')
//         resolve(true)
//       })
//     })
//   })

//   it("should create a valid class instance with feeToken as native token of network", () => {
//     return new Promise(function (resolve, reject) {
//       linkdropSDK.createClaimLink({
//         from: userAccount,
//         chainId,
//         token,
//         tokenType: 'ERC721',
//         tokenId
//       }).then(link => {
//         expect(link.feeToken).to.equal(nativeTokenAddress)
//         resolve(true)
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   })

//   it("should create a valid class instance with feeAmount as 33300000000000 for ERC20 token", () => {
//     return new Promise(function (resolve, reject) {
//       linkdropSDK.createClaimLink({
//         from: userAccount,
//         chainId,
//         token,
//         tokenType: 'ERC721',
//         tokenId
//       }).then(link => {
//         expect(link.feeAmount).to.equal('33300000000000')
//         resolve(true)
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   })
// })
