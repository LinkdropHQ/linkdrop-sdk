import { ethers } from 'ethers'

const getNonce = (
  from: string,
  transferId: string,
  amount: string,
  expiration: string,
  feeAmount: string
) => {
  return ethers.solidityPackedKeccak256(
    ['address', 'address', 'uint256', 'uint120', 'uint128'],
    [from, transferId, amount, expiration, feeAmount]
  )
}

export default getNonce
