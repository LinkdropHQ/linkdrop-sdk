import { EEscrowAddress, EChains, TTokenType } from "../types"

type TDefineIfEscrowAddressIsCorrect = (
  chainId: number | null,
  escrowAddress: string,
  tokenType: TTokenType
) => boolean

const defineIfEscrowAddressIsCorrect: TDefineIfEscrowAddressIsCorrect = (
  chainId,
  escrowAddress,
  tokenType
) => {

  if (!chainId || !escrowAddress || !tokenType) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseERC20.toLowerCase()
    && chainId === EChains.base
    && tokenType === 'ERC20'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseERC721.toLowerCase()
    && chainId === EChains.base
    && tokenType === 'ERC721'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseERC1155.toLowerCase()
    && chainId === EChains.base
    && tokenType === 'ERC1155'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseNative.toLowerCase()
    && chainId === EChains.base
    && tokenType === 'NATIVE'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC20.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === 'ERC20'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC721.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === 'ERC721'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC1155.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === 'ERC1155'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonNative.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === 'NATIVE'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC20.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === 'ERC20'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC721.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === 'ERC721'
  ) {
    return false
  }
  

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC1155.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === 'ERC1155'
  ) {
    return false
  }
  
  if (
    escrowAddress !== EEscrowAddress.mumbaiNative.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === 'NATIVE'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC20.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === 'ERC20'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC1155.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === 'ERC1155'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC721.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === 'ERC721'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliNative.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === 'NATIVE'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.avalancheNative.toLowerCase()
    && chainId === EChains.avalanche
    && tokenType === 'NATIVE'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.avalancheERC20.toLowerCase()
    && chainId === EChains.avalanche
    && tokenType === 'NATIVE'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.arbitrumNative.toLowerCase()
    && chainId === EChains.arbitrum
    && tokenType === 'ERC20'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.arbitrumERC20.toLowerCase()
    && chainId === EChains.arbitrum
    && tokenType === 'ERC20'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.optimismNative.toLowerCase()
    && chainId === EChains.optimism
    && tokenType === 'NATIVE'
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.optimismERC20.toLowerCase()
    && chainId === EChains.optimism
    && tokenType === 'ERC20'
  ) {
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect