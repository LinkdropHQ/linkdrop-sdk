import { ethers } from 'ethers'
import { getNonce } from '..'
import { TDomain, TSignTypedData } from '../../types'

async function getDepositAuthorizationAvalanche(
  signTypedData: TSignTypedData,
  sender: string,
  to: string,
  amount: string,
  validAfter: number,
  validBefore: number,
  transferId: string,
  expiration: string,
  feeAmount: string,
  domain: TDomain
) {
  // The EIP-712 type data
  const types = {
    ReceiveWithAuthorization: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'validAfter', type: 'uint256' },
      { name: 'validBefore', type: 'uint256' },
      { name: 'nonce', type: 'bytes32' },
    ],
  }
  const nonce = getNonce(sender, transferId, amount, expiration, feeAmount)
  const message = {
    from: sender,
    to,
    value: amount,
    validAfter,
    validBefore,
    nonce
  }

  const signature = await signTypedData(domain, types, message)
  const signatureSplit = ethers.Signature.from(signature)

  // Encode the authorization
  const coder = ethers.AbiCoder.defaultAbiCoder()
  const authorization = coder.encode(
    ['address', 'address', 'uint256', 'uint256', 'uint256', 'bytes32', 'uint8', 'bytes32', 'bytes32'],
    [message.from, message.to, message.value, message.validAfter, message.validBefore, message.nonce, signatureSplit.v, signatureSplit.r, signatureSplit.s]
  )

  return authorization
}

export default getDepositAuthorizationAvalanche
