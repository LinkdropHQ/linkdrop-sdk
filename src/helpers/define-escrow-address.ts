import * as configs from '../configs'
import { TDeploymentType, TTokenType } from '../types'

type TDefineEscrowAddress = (
  chainId: number | null,
  tokenType: TTokenType,
  deployment: TDeploymentType
) => string | null

const defineEscrowAddress: TDefineEscrowAddress = (
  chainId,
  tokenType,
  deployment
) => {
  if (!chainId || !tokenType) {
    return null
  }

  if (deployment === 'CBW') {
    const escrow = configs.cbwEscrowContract
    if (!escrow) {
      return null
    }
    return escrow
  }

  if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
    return configs.mainEscrowContractNFT
  }
  
  return configs.mainEscrowContract
}

export default defineEscrowAddress