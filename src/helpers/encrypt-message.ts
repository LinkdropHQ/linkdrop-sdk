import { TGetRandomBytes, TSignTypedData } from '../types'
import { ethers, encodeBase58 } from 'ethers'
import { encrypt } from '../crypto'
import {
  createMessageEncyptionKey
} from '.'

type TEncryptMessage = ({
  message,
  signTypedData,
  chainId,
  transferId,
  getRandomBytes,
  encryptionKeyLength
}: {
  message: string,
  signTypedData: TSignTypedData,
  transferId: string,
  chainId: number,
  getRandomBytes: TGetRandomBytes,
  encryptionKeyLength?: number
}) => Promise<{
  encryptedSenderMessage: string
  encryptionKey: string
}>

const encryptMessage: TEncryptMessage = async ({
  chainId,
  transferId,
  message,
  signTypedData,
  getRandomBytes,
  encryptionKeyLength
}) => {

  const {
    encryptionKey, // used to encrypt message
    encryptionKeyLinkParam
  } = await createMessageEncyptionKey({
    transferId,
    signTypedData,
    encryptionKeyLength,
    chainId
  })

  const encryptedSenderMessage = encrypt({
    message,
    symKey: encryptionKey,
    randomBytes: getRandomBytes
  })

  return {
    encryptedSenderMessage, // encrypted sender message
    encryptionKey: encryptionKeyLinkParam // goes to link as `m=...` query param
  }
}

export default encryptMessage