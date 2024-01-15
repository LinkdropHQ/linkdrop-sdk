import {
  EEscrowAddress,
  EChains,
  ETokenAddress,
  ESelectors,
  ETokenType
} from '../types'

export const polygonJSONRPCUrl = 'https://polygon-mainnet.infura.io/v3/f5f8608d75874e5fbcdd4ee9657b8ab5'
export const mumbaiJSONRPCUrl = 'https://polygon-mumbai.infura.io/v3/f5f8608d75874e5fbcdd4ee9657b8ab5'
export const baseJSONRPCUrl = 'https://developer-access-mainnet.base.org'
export const baseGoerliJSONRPCUrl = 'https://base-goerli.publicnode.com'

export const baseUrl = 'http://localhost:3000'
export const apiUrl = 'https://escrow-api.linkdrop.io/v3'

export const nativeTokenAddress = '0x0000000000000000000000000000000000000000'

export const escrowContracts = {
  [`${EChains.base}_${ETokenType.NATIVE}`]: EEscrowAddress.baseNative,
  [`${EChains.base}_${ETokenType.ERC20}`]: EEscrowAddress.baseERC20,
  [`${EChains.base}_${ETokenType.ERC721}`]: EEscrowAddress.baseERC721,
  [`${EChains.base}_${ETokenType.ERC1155}`]: EEscrowAddress.baseERC1155,

  [`${EChains.baseGoerli}_${ETokenType.NATIVE}`]: EEscrowAddress.baseGoerliNative,
  [`${EChains.baseGoerli}_${ETokenType.ERC20}`]: EEscrowAddress.baseGoerliERC20,
  [`${EChains.baseGoerli}_${ETokenType.ERC721}`]: EEscrowAddress.baseGoerliERC721,
  [`${EChains.baseGoerli}_${ETokenType.ERC1155}`]: EEscrowAddress.baseGoerliERC1155,

  [`${EChains.polygon}_${ETokenType.NATIVE}`]: EEscrowAddress.polygonNative,
  [`${EChains.polygon}_${ETokenType.ERC20}`]: EEscrowAddress.polygonERC20,
  [`${EChains.polygon}_${ETokenType.ERC721}`]: EEscrowAddress.polygonERC721,
  [`${EChains.polygon}_${ETokenType.ERC1155}`]: EEscrowAddress.polygonERC1155,

  [`${EChains.mumbai}_${ETokenType.NATIVE}`]: EEscrowAddress.mumbaiNative,
  [`${EChains.mumbai}_${ETokenType.ERC20}`]: EEscrowAddress.mumbaiERC20,
  [`${EChains.mumbai}_${ETokenType.ERC721}`]: EEscrowAddress.mumbaiERC721,
  [`${EChains.mumbai}_${ETokenType.ERC1155}`]: EEscrowAddress.mumbaiERC1155,
}

export const supportedStableCoins = {
  [ETokenAddress.usdcBase]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBaseGoerli]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBridgedPolygon]: ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcMumbai]:  ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcPolygon]:  ESelectors.receiveWithAuthorization
}
