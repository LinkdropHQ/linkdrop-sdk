import { TSignTypedData } from '../types'
import { ethers } from 'ethers'
import * as wccrypto from '@walletconnect/utils/dist/esm'

type TEncryptMessage = ({
  message,
  signTypedData,
  chainId,
  transferId
}: {
  message: string,
  signTypedData: TSignTypedData,
  transferId: string,
  chainId: number
}) => Promise<string>

const encryptMessage: TEncryptMessage = async ({
  chainId,
  transferId,
  message,
  signTypedData
}) => {

  const domain = {
    name: "MyEncryptionScheme",
    version: "1",
    chainId: chainId
  };

  const types = {
    EncryptionMessage: [
      { name: "seed", type: "string" }
    ]
  };

  // Now you can sign typed data as follows:

  const seed = `Encrypting message (transferId: ${transferId})`
  const value = {
    seed
  }
  const signature = await signTypedData(domain, types, value)
  const encryptionKey = ethers.sha256(signature)
  const encryptedMessage = wccrypto.encrypt({ message, symKey: encryptionKey })

  return encryptedMessage
}

export default encryptMessage