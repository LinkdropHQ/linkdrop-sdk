import { ethers } from 'ethers'
import { TEscrowPaymentDomain, TSignTypedData, TGetRandomBytes } from '../../types'

const generateLinkKeyandSignature = async (
  signTypedData: TSignTypedData,
  getRandomBytes: TGetRandomBytes,
  transferId: string,
  domain: TEscrowPaymentDomain
) => {
  ethers.randomBytes.register(getRandomBytes)
  const linkKey = ethers.Wallet.createRandom()

  const types = {
    Transfer: [
      { name: 'linkKeyId', type: 'address' },
      { name: 'transferId', type: 'address' }
    ]
  }

  const message = {
    linkKeyId: linkKey.address,
    transferId: transferId
  }

  const senderSig = await signTypedData(domain, types, message)
  return {
    linkKey: linkKey.privateKey,
    linkKeyId: linkKey.address,
    senderSig
  }
}

export default generateLinkKeyandSignature
