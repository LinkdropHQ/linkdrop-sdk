import { EEscrowAddress, EChains, ETokenType } from "../types"

type TDefineIfEscrowAddressIsCorrect = (
  chainId: number | null,
  escrowAddress: string,
  tokenType: ETokenType
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
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseERC721.toLowerCase()
    && chainId === EChains.base
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseERC1155.toLowerCase()
    && chainId === EChains.base
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseNative.toLowerCase()
    && chainId === EChains.base
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC20.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC721.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC1155.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonNative.toLowerCase()
    && chainId === EChains.polygon
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC20.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC721.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC1155.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }
  
  if (
    escrowAddress !== EEscrowAddress.mumbaiNative.toLowerCase()
    && chainId === EChains.mumbai
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC20.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC1155.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC721.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliNative.toLowerCase()
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect