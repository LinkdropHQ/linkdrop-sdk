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
  encryptionKey,
  getRandomBytes
}) => {

  // const encryptionKeyDecoded = ethers.toBeHex(decodeBase58(encryptionKey), 5)
  const encryptionKeyAsUint8Array = convertBase58ToUint8array(encryptionKey)
  const encryptionKeyFinal = ethers.sha256(encryptionKeyAsUint8Array).replace('0x', '')

  const dcryptedMessage = decrypt({
    encoded: message,
    symKey: encryptionKeyFinal,
    randomBytes: getRandomBytes
  })
  return dcryptedMessage
}

export default decryptMessage