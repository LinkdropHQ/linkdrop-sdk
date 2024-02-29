import * as configs from '../configs'
import { TTokenType } from '../types'

type TDefineEscrowAddress = (
  chainId: number | null,
  tokenType: TTokenType,
  apiKey: string
) => string | null

const defineEscrowAddress: TDefineEscrowAddress = (
  chainId,
  tokenType,
  apiKey
) => {
  if (!chainId || !tokenType) {
    return null
  }

  if (apiKey.includes('CBW-')) {
    const escrow = configs.escrowContractsCBW[`${chainId}_${tokenType}`]
    if (!escrow) {
      return null
    }
    return escrow
  }
  
  return configs.mainEscrowContract
}

export default defineEscrowAddress