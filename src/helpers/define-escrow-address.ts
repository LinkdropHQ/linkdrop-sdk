import * as configs from '../configs'
import { ETokenType } from '../types'

type TDefineEscrowAddress = (
  chainId: number | null,
  tokenType: ETokenType
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