import { ethers, decodeBase58 } from 'ethers'

const defineSig = (
  signatureLength: number = 65,
  signature?: string
) => {
  if (!signature) return undefined
  const originalSignature = decodeBase58(signature)
  return ethers.toBeHex(originalSignature, signatureLength)
}

export default defineSig