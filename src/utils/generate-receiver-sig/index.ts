import { ethers } from 'ethers'

const generateReceiverSig = async (linkKey: string, receiver: string) => {
  const wallet = new ethers.Wallet(linkKey)
  const messageHash = ethers.utils.solidityKeccak256(
    ['address'],
    [receiver]
  )
  const messageHashToSign = ethers.utils.arrayify(messageHash)
  const signature = await wallet.signMessage(messageHashToSign)
  return signature
}

export default generateReceiverSig