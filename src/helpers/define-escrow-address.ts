import * as configs from '../configs'
import {
  TDeploymentType,
  TTokenType,
  EChains
} from '../types'

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
    if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
      const escrow = configs.cbwEscrowContractNFT
      if (!escrow) {
        return null
      }
      return escrow
    }
    const escrow = configs.cbwEscrowContract
    if (!escrow) {
      return null
    }
    return escrow
  }

  if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
    if (chainId === EChains.immutableZkevm) {
      return configs.immutableZkevmContractNFT
    }
    return configs.mainEscrowContractNFT
  }

  if (chainId === EChains.immutableZkevm) {
    return configs.immutableZkevmContract
  }
  
  return configs.mainEscrowContract
}

export default defineEscrowAddress