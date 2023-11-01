import { ethers } from 'ethers'

const generateReceiverSig = async (linkKey: string, receiver: string) => {
  const wallet = new ethers.Wallet(linkKey)
  const messageHash = ethers.solidityPackedKeccak256(
    ['address'],
    [receiver]
  )
  const messageHashToSign = ethers.getBytes(messageHash)
  const signature = await wallet.signMessage(messageHashToSign)
  return signature
}

export default generateReceiverSig
