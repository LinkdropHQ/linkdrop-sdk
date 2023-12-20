import * as configs from '../configs'

type TDefineEscrowAddress = (
  chainId: number | null,
) => string | null

const defineEscrowAddress: TDefineEscrowAddress = (
  chainId 
) => {
  if (!chainId) {
    return null
  }
  const escrow = configs.escrowContracts[chainId]
  if (!escrow) {
    return null
  }
  return escrow
}

export default defineEscrowAddress