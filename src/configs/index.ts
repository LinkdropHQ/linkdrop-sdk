import {
  ETokenAddress,
  ESelectors
} from '../types'

export const baseUrl = 'http://localhost:3000'
export const apiUrl = 'https://escrow-api.linkdrop.io/v3'
export const dashboardApiUrl = 'https://escrow-api.linkdrop.io/dashboard'
export const devDashboardApiUrl = 'https://escrow-api.linkdrop.io/staging'

export const nativeTokenAddress = '0x0000000000000000000000000000000000000000'

export const cbwEscrowContract = '0x5badb0143f69015c5c86cbd9373474a9c8ab713b'
export const mainEscrowContract = '0xbe7b40eb3a9d85d3a76142cb637ab824f0d35ead'

export const cbwEscrowContractNFT = '0x3c74782de03c0402d207fe41307fe50fe9b6b5c7'
export const mainEscrowContractNFT = '0x5fc1316119a1b7cec52a2984c62764343dca70c9'

export const MAX_MESSAGE_ENCRYPTION_KEY_LENGTH = 43
export const MIN_MESSAGE_ENCRYPTION_KEY_LENGTH = 6
export const MAX_MESSAGE_TEXT_LENGTH = 140

export const supportedStableCoins = {
  [ETokenAddress.usdcBase]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.eurcBase]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBridgedPolygon]: ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcPolygon]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcArbitrum]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcOptimism]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcAvalanche]: ESelectors.receiveWithAuthorizationEOA,
  [ETokenAddress.cbBTC]: ESelectors.receiveWithAuthorizationEOA
}
