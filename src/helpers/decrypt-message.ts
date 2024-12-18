import { decrypt } from '../crypto'
import { TGetRandomBytes } from '../types'
import { ethers, decodeBase58 } from 'ethers'
import { convertBase58ToUint8array } from '.'

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
  encryptionKey
}) => {
  const messageEncrypted = message.slice(2) // first two characters are for encryptionKey length
  const encryptionKeyAsUint8Array = convertBase58ToUint8array(encryptionKey)
  const encryptionKeyFinal = ethers.sha256(encryptionKeyAsUint8Array).replace('0x', '')
  const decryptedMessage = decrypt({
    encoded: messageEncrypted,
    symKey: encryptionKeyFinal
  })
  return decryptedMessage
}

export default decryptMessage
