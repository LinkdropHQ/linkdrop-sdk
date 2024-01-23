import {
  EEscrowAddress,
  EChains,
  ETokenAddress,
  ESelectors 
} from '../types'

export const polygonJSONRPCUrl = 'https://polygon-mainnet.infura.io/v3/f5f8608d75874e5fbcdd4ee9657b8ab5'
export const mumbaiJSONRPCUrl = 'https://polygon-mumbai.infura.io/v3/f5f8608d75874e5fbcdd4ee9657b8ab5'
export const baseJSONRPCUrl = 'https://developer-access-mainnet.base.org'
export const baseGoerliJSONRPCUrl = 'https://base-goerli.publicnode.com'

export const baseUrl = 'http://localhost:3000'
export const apiUrl = 'https://escrow-api.linkdrop.io/v3'

export const nativeTokenAddress = '0x0000000000000000000000000000000000000000'

export const escrowContracts = {
  [`${EChains.base}_NATIVE`]: EEscrowAddress.baseNative,
  [`${EChains.base}_ERC20`]: EEscrowAddress.baseERC20,
  [`${EChains.base}_ERC721`]: EEscrowAddress.baseERC721,
  [`${EChains.base}_ERC1155`]: EEscrowAddress.baseERC1155,

  [`${EChains.baseGoerli}_NATIVE`]: EEscrowAddress.baseGoerliNative,
  [`${EChains.baseGoerli}_ERC20`]: EEscrowAddress.baseGoerliERC20,
  [`${EChains.baseGoerli}_ERC721`]: EEscrowAddress.baseGoerliERC721,
  [`${EChains.baseGoerli}_ERC1155`]: EEscrowAddress.baseGoerliERC1155,

  [`${EChains.polygon}_NATIVE`]: EEscrowAddress.polygonNative,
  [`${EChains.polygon}_ERC20`]: EEscrowAddress.polygonERC20,
  [`${EChains.polygon}_ERC721`]: EEscrowAddress.polygonERC721,
  [`${EChains.polygon}_ERC1155`]: EEscrowAddress.polygonERC1155,

  [`${EChains.mumbai}_NATIVE`]: EEscrowAddress.mumbaiNative,
  [`${EChains.mumbai}_ERC20`]: EEscrowAddress.mumbaiERC20,
  [`${EChains.mumbai}_ERC721`]: EEscrowAddress.mumbaiERC721,
  [`${EChains.mumbai}_ERC1155`]: EEscrowAddress.mumbaiERC1155,
}

export const supportedStableCoins = {
  [ETokenAddress.usdcBase]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBaseGoerli]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBridgedPolygon]: ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcMumbai]:  ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcPolygon]:  ESelectors.receiveWithAuthorization
}
