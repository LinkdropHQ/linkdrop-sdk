import { ethers } from 'ethers'
import { decrypt } from '../crypto'

type TDecryptMessage = ({
  message,
  encryptionKey
}: {
  message: string,
  encryptionKey: string
}) => string

const decryptMessage: TDecryptMessage = ({
  message,
  encryptionKey
}) => {
  const encryptionKeyFinal = ethers.sha256(encryptionKey).replace('0x', '')
  const dcryptedMessage = decrypt({ encoded: message, symKey: encryptionKeyFinal })
  return dcryptedMessage
}

export default decryptMessage