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
    escrowAddress !== EEscrowAddress.baseERC20
    && chainId === EChains.base
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseERC721
    && chainId === EChains.base
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseERC1155
    && chainId === EChains.base
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseNative
    && chainId === EChains.base
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC20
    && chainId === EChains.polygon
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC721
    && chainId === EChains.polygon
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonERC1155
    && chainId === EChains.polygon
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.polygonNative
    && chainId === EChains.polygon
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC20
    && chainId === EChains.mumbai
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC721
    && chainId === EChains.mumbai
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.mumbaiERC1155
    && chainId === EChains.mumbai
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }
  
  if (
    escrowAddress !== EEscrowAddress.mumbaiNative
    && chainId === EChains.mumbai
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC20
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.ERC20
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC1155
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.ERC1155
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliERC721
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.ERC721
  ) {
    return false
  }

  if (
    escrowAddress !== EEscrowAddress.baseGoerliNative
    && chainId === EChains.baseGoerli
    && tokenType === ETokenType.NATIVE
  ) {
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect