import { TDomain, TSignTypedData } from "../types"
import { ethers, encodeBase58 } from 'ethers'
import { convertBase58ToUint8array } from '.'

type TCreateMessageEncyptionKey = ({
  transferId,
  signTypedData,
  encryptionKeyLength
}: {
  transferId: string,
  signTypedData: TSignTypedData,
  chainId: number,
  encryptionKeyLength?: number
}) => Promise<{
  encryptionKey: string
  encryptionKeyLinkParam: string
}>

const createMessageEncyptionKey: TCreateMessageEncyptionKey = async ({
  transferId,
  signTypedData,
  chainId,
  encryptionKeyLength
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

  const encryptionKeyModified = encodeBase58(encryptionKeyInitial).slice(0, encryptionKeyLength || 12)

  const encryptionKey = ethers.sha256(convertBase58ToUint8array(encryptionKeyModified)).replace('0x', '')

  return {
    encryptionKey,
    encryptionKeyLinkParam: encryptionKeyModified // goes to link as a query param
  }
}

export default createMessageEncyptionKey