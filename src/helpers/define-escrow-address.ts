import * as configs from '../configs'

type TDefineEscrowAddress = (
  chainId: number | null,
  token: string
) => string | null

const defineEscrowAddress: TDefineEscrowAddress = (
  chainId,
  token
) => {
  if (!chainId || !token) {
    return null
  }
  const escrow = configs.escrowContracts[`${chainId}_${token}`]
  if (!escrow) {
    return null
  }
  return escrow
}

export default defineEscrowAddress