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
  [EChains.base]: EEscrowAddress.base,
  [EChains.polygon]: EEscrowAddress.polygon,
  [EChains.baseGoerli]: EEscrowAddress.baseGoerli,
  [EChains.mumbai]: EEscrowAddress.mumbai
}

export const supportedStableCoins = {
  [ETokenAddress.usdcBase]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBaseGoerli]: ESelectors.receiveWithAuthorization,
  [ETokenAddress.usdcBridgedPolygon]: ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcMumbai]:  ESelectors.approveWithAuthorization,
  [ETokenAddress.usdcPolygon]:  ESelectors.receiveWithAuthorization
}
