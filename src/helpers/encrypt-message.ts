import { TGetRandomBytes, TSignTypedData } from '../types'
import { ethers } from 'ethers'
import { encrypt } from '../crypto'

type TEncryptMessage = ({
  message,
  signTypedData,
  chainId,
  transferId,
  getRandomBytes
}: {
  message: string,
  signTypedData: TSignTypedData,
  transferId: string,
  chainId: number,
  getRandomBytes: TGetRandomBytes
}) => Promise<{
  encryptedMessage: string
  encryptionKey: string
}>

const encryptMessage: TEncryptMessage = async ({
  chainId,
  transferId,
  message,
  signTypedData,
  getRandomBytes
}) => {

  const domain = {
    name: "MyEncryptionScheme",
    version: "1",
    chainId: chainId
  }

  const types = {
    EncryptionMessage: [
      { name: "seed", type: "string" }
    ]
  }

  const seed = `Encrypting message (transferId: ${transferId})`
  const value = { seed }
  const signature = await signTypedData(domain, types, value)

  const encryptionKeyInitial = ethers.sha256(signature)
  const encryptionKeyModified = encryptionKeyInitial.slice(0, 12)
  const encryptionKeyFinal = ethers.sha256(encryptionKeyModified).replace('0x', '')
  const encryptedMessage = encrypt({
    message,
    symKey: encryptionKeyFinal,
    randomBytes: getRandomBytes
  })
  return {
    encryptedMessage,
    encryptionKey: encryptionKeyModified // уйдет в линк
  }
}

export default encryptMessage