import * as configs from '../configs'
import { TDeploymentType, TTokenType } from '../types'

type TDefineIfEscrowAddressIsCorrect = (
  escrowAddress: string,
  tokenType: TTokenType,
  deployment: TDeploymentType
) => boolean

const defineIfEscrowAddressIsCorrect: TDefineIfEscrowAddressIsCorrect = (
  escrowAddress,
  tokenType,
  deployment
) => {

  if (!escrowAddress || !tokenType) {
    return false
  }

  if (deployment === 'CBW') {
    if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
      if (escrowAddress !== configs.cbwEscrowContractNFT) {
        return false
      }
      return true
    }
    if (escrowAddress !== configs.cbwEscrowContract) {
      return false
    }
    return true
  }

  if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
    if (escrowAddress !== configs.mainEscrowContractNFT) {
      return false
    }
    return true
  }

  if (escrowAddress !== configs.mainEscrowContract) {
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect