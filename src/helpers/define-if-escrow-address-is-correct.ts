import * as configs from '../configs'
import { EChains, TDeploymentType, TTokenType } from '../types'
import defineVersionByEscrow from './define-version-by-escrow'

type TDefineIfEscrowAddressIsCorrect = (
  escrowAddress: string,
  tokenType: TTokenType,
  deployment: TDeploymentType,
  chainId: number | null
) => boolean

const defineIfEscrowAddressIsCorrect: TDefineIfEscrowAddressIsCorrect = (
  escrowAddress,
  tokenType,
  deployment,
  chainId
) => {

  if (!escrowAddress || !tokenType) {
    return false
  }

  if (deployment === 'CBW') {
    if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
      if (escrowAddress !== configs.cbwEscrowContractNFT) {
        // check if was created with previous version

        const versionOfEscrow = defineVersionByEscrow(escrowAddress)
        if (versionOfEscrow) {
          return true
        }

        return false
      }
      return true
    }
    if (escrowAddress !== configs.cbwEscrowContract) {
      const versionOfEscrow = defineVersionByEscrow(escrowAddress)
      if (versionOfEscrow) {
        return true
      }
      return false
    }
    return true
  }

  if (chainId === EChains.immutableZkevm) {
    if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
      return escrowAddress === configs.immutableZkevmContractNFT
    }
    return escrowAddress === configs.immutableZkevmContract
  }

  if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
    if (escrowAddress !== configs.mainEscrowContractNFT) {
      const versionOfEscrow = defineVersionByEscrow(escrowAddress)
      if (versionOfEscrow) {
        return true
      }
      return false
    }
    return true
  }

  if (escrowAddress !== configs.mainEscrowContract) {
    const versionOfEscrow = defineVersionByEscrow(escrowAddress)
    if (versionOfEscrow) {
      return true
    }
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect