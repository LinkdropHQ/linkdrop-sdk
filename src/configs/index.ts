import {
  ETokenAddress,
  EEscrowAddress,
  EChains
} from '../types'
export const polygonApiUrl = 'https://escrow-api.linkdrop.io/v2/polygon'
export const mumbaiApiUrl = 'https://escrow-api.linkdrop.io/v2/mumbai'
export const baseApiUrl = 'https://escrow-api.linkdrop.io/v2/base'
export const baseGoeliApiUrl = 'https://escrow-api.linkdrop.io/v2/base-goerli'
export const devApiUrl = 'https://escrow-api.linkdrop.io/dev'

export const polygonJSONRPCUrl = 'https://polygon-mainnet.infura.io/v3/f5f8608d75874e5fbcdd4ee9657b8ab5'
export const mumbaiJSONRPCUrl = 'https://polygon-mumbai.infura.io/v3/f5f8608d75874e5fbcdd4ee9657b8ab5'
export const baseJSONRPCUrl = 'https://developer-access-mainnet.base.org'
export const baseGoerliJSONRPCUrl = 'https://base-goerli.publicnode.com'

export const baseUrl = 'http://localhost:3000'

export const escrowContracts = {
  [`${EChains.base}_${ETokenAddress.nativeBase}`]: EEscrowAddress.nativeBase,
  [`${EChains.polygon}_${ETokenAddress.nativePolygon}`]: EEscrowAddress.nativePolygon,
  [`${EChains.baseGoerli}_${ETokenAddress.nativeBaseGoerli}`]: EEscrowAddress.nativeBaseGoerli,
  [`${EChains.mumbai}_${ETokenAddress.nativeMumbai}`]: EEscrowAddress.nativeMumbai,
  [`${EChains.base}_${ETokenAddress.usdcBase}`]: EEscrowAddress.usdcBase,
  [`${EChains.polygon}_${ETokenAddress.usdcPolygon}`]: EEscrowAddress.usdcPolygon,
  [`${EChains.polygon}_${ETokenAddress.usdcBridgedPolygon}`]: EEscrowAddress.usdcBridgedPolygon,
  [`${EChains.mumbai}_${ETokenAddress.usdcMumbai}`]: EEscrowAddress.usdcMumbai,
  [`${EChains.baseGoerli}_${ETokenAddress.usdcBaseGoerli}`]: EEscrowAddress.usdcBaseGoerli,
}
