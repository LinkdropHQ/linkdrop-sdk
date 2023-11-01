import { ethers } from 'ethers'
import { TEscrowPaymentDomain, TSignTypedData, TGetRandomBytes } from '../../types'

const generateLinkKeyandSignature = async (
  signTypedData: TSignTypedData,
  getRandomBytes: TGetRandomBytes,
  transferId: string,
  domain: TEscrowPaymentDomain
) => {

  const mnemonic = ethers.Mnemonic.fromEntropy(await getRandomBytes(32))
  const linkKey = ethers.Wallet.fromPhrase(mnemonic.phrase)

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
