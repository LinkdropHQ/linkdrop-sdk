import {
  ETokenAddress,
  ESelectors 
} from '../types'

export const baseUrl = 'http://localhost:3000'
export const apiUrl = 'https://escrow-api.linkdrop.io/v3'
export const dashboardApiUrl = 'https://escrow-api.linkdrop.io/dashboard'

export const nativeTokenAddress = '0x0000000000000000000000000000000000000000'

export const cbwEscrowContract = '0x2d5dfe0e4582c905233df527242616017f36e192'
export const mainEscrowContract = '0x88d51990a3b962f975846f3688e36d2a1fc611f1'

export const supportedStableCoins = {
  [ETokenAddress.usdcBase]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBaseGoerli]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBridgedPolygon]: ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcMumbai]:  ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcPolygon]:  ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcArbitrum]:  ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcOptimism]:  ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcAvalanche]:  ESelectors.receiveWithAuthorization,
  [ETokenAddress.cbBTC]: ESelectors.receiveWithAuthorization,
}
