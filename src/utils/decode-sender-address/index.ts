import { ethers } from 'ethers'
import { TEscrowPaymentDomain } from '../../types'

const decodeSenderAddress = (
  linkKeyId: string,
  transferId: string,
  senderSig: string,
  domain: TEscrowPaymentDomain
): string => {

  const types = {
    Transfer: [
      { name: 'linkKeyId', type: 'address' },
      { name: 'transferId', type: 'uint256' }
    ]
  };
  const message = {
    linkKeyId: linkKeyId,
    transferId: transferId
  };
  const recoveredAddress = ethers.verifyTypedData(domain, types, message, senderSig)
  return recoveredAddress
};

export default decodeSenderAddress
