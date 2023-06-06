import * as x25519 from '@stablelib/x25519'
import { toString } from 'uint8arrays'
import TGenerateKeyPair from './types'

export const BASE16 = 'base16'

const generateKeyPair: TGenerateKeyPair = () => {
  const keyPair = x25519.generateKeyPair()
  return {
    privateKey: keyPair.secretKey,
    publicKey: toString(keyPair.publicKey, BASE16)
  }
}

export default generateKeyPair
