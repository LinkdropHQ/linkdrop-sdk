import { sha256, isHexString, SigningKey } from 'ethers'
const isValidSignature = (sig: string) => isHexString(sig) && sig.length === 132

type TGenerateStealthKeys = (
  address: string,
  signature: string | null | undefined
) => {
  spendingPubKeyPrefix: number,
  spendingPubKey: string,
  viewingPubKeyPrefix: number,
  viewingPubKey: string
}

const generateStealthKeys: TGenerateStealthKeys = (address, signature) => { 
  if (!signature) { 
      signature = sha256(`sk_${address}`) + sha256(`vk_${address}`)
  }

  // Verify signature
  if (!isValidSignature(signature)) {
    throw new Error(`Invalid signature: ${signature}`)
  }

  // Split hex string signature into two 32 byte chunks
  const startIndex = 2; // first two characters are 0x, so skip these
  const length = 64; // each 32 byte chunk is in hex, so 64 characters
  const portion1 = signature.slice(startIndex, startIndex + length)
  const portion2 = signature.slice(startIndex + length, startIndex + length + length)
  const lastByte = signature.slice(signature.length - 2)

  if (`0x${portion1}${portion2}${lastByte}` !== signature) {
    throw new Error('Signature incorrectly generated or parsed')
  }

 // Hash the signature pieces to get the two private keys
 const spendingPrivateKey = sha256(`0x${portion1}`)
 const viewingPrivateKey = sha256(`0x${portion2}`)

 // Compute the Compressed public keys
 const spendingPubKey = SigningKey.computePublicKey(spendingPrivateKey, true)
 const viewingPubKey = SigningKey.computePublicKey(viewingPrivateKey, true)

 // Break public keys into the required components to store compressed public keys
 const spendingPubKeyPrefix = Number(spendingPubKey[3])  // prefix bit is the 2th character in the string (no 0x prefix)
 const viewingPubKeyPrefix = Number(viewingPubKey[3])  // prefix bit is the 2th character in the string (no 0x prefix)
 
 return { spendingPubKeyPrefix, spendingPubKey, viewingPubKeyPrefix, viewingPubKey }
}

export default generateStealthKeys