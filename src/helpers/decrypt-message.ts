import { ethers } from 'ethers'
import { decrypt } from '../crypto'
import { TGetRandomBytes } from '../types'

type TDecryptMessage = ({
  message,
  encryptionKey,
  getRandomBytes
}: {
  message: string,
  encryptionKey: string,
  getRandomBytes: TGetRandomBytes

}) => string

const decryptMessage: TDecryptMessage = ({
  message,
  encryptionKey,
  getRandomBytes
}) => {
  const encryptionKeyFinal = ethers.sha256(encryptionKey).replace('0x', '')
  const dcryptedMessage = decrypt({
    encoded: message,
    symKey: encryptionKeyFinal,
    randomBytes: getRandomBytes
  })
  return dcryptedMessage
}

export default decryptMessage