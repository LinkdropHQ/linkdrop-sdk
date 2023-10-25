import { ethers } from 'ethers'
import { TEscrowPaymentDomain, TSignTypedData, TGetRandomBytes } from '../../types'

const generateLinkKeyandSignature = async (
  signTypedData: TSignTypedData,
  getRandomBytes: TGetRandomBytes,
  transferId: string,
  domain: TEscrowPaymentDomain
) => {

  const linkKey = new ethers.Wallet(await getRandomBytes(32))

  const types = {
    Transfer: [
      { name: 'linkKeyId', type: 'address' },
      { name: 'transferId', type: 'uint256' }
    ]
  }

  const message = {
    linkKeyId: linkKey.address,
    transferId: transferId
  }

  if (signTypedData) {
    const senderSig = await signTypedData(domain, types, message)
    return {
      linkKey: linkKey.privateKey,
      linkKeyId: linkKey.address,
      senderSig
    }
  }
}

export default generateLinkKeyandSignature
