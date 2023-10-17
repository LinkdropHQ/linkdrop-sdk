import generateKeyPair from '../generate-keypair'
import { ethers } from 'ethers'
import { TEscrowPaymentDomain, TSignTypedData } from '../../types'

const generateLinkKeyandSignature = async (
  signTypedData: TSignTypedData,
  transferId: string,
  domain: TEscrowPaymentDomain
) => {

//   // Generate a new private key
//   const getRandomBytes = (length: number) => { 
//     return new Uint8Array(randomBytes(length))
//   }
//   const generatedRandomBytes = getRandomBytes(32)
  const linkKey = new ethers.Wallet(generatedRandomBytes)

  // Create the data to sign
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
    return { linkKey: linkKey.privateKey, linkKeyId: linkKey.address, senderSig }
  }

}

export default generateLinkKeyandSignature
