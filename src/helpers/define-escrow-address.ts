import * as configs from '../configs'
import { TTokenType } from '../types'

type TDefineEscrowAddress = (
  chainId: number | null,
  tokenType: TTokenType
) => string | null

const defineEscrowAddress: TDefineEscrowAddress = (
  chainId,
  tokenType
) => {
  if (!chainId || !tokenType) {
    return null
  }
  const escrow = configs.escrowContracts[`${chainId}_${tokenType}`]
  if (!escrow) {
    return null
  }
  return escrow
}

export default defineEscrowAddress