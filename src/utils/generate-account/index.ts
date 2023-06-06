import { ethers } from 'ethers'
import generateKeyPair from '../generate-keypair'
import TGenerateAccount from './types'
import { toString } from 'uint8arrays'
export const BASE16 = 'base16'

const generateAccount: TGenerateAccount = (
  shortCodeLength,
  shortCodeMixRegister
) => {
  const { privateKey } = generateKeyPair()
  let shortCode = ethers.utils.base58.encode(privateKey).substring(0,shortCodeLength)
  if (!shortCodeMixRegister) {
    shortCode = shortCode.toUpperCase()
  }
  const linkKey = ethers.utils.id(shortCode)
  const address = new ethers.Wallet(linkKey).address
  return {
    privateKey: toString(privateKey, BASE16),
    address,
    shortCode
  }  
}

export default generateAccount