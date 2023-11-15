import * as configs from '../configs'
import { ETokenSymbol, ETokenAddress, EChains } from '../types'

type TDefineEscrowAddressByTokenSymbol = (
  chainId: number | null,
  tokenSymbol?: ETokenSymbol
) => string | null

const defineEscrowAddressByTokenSymbol: TDefineEscrowAddressByTokenSymbol = (
  chainId,
  tokenSymbol
) => {
  if (!chainId || !tokenSymbol) {
    return null
  }

  switch (tokenSymbol) {
    case ETokenSymbol.eth: {
      if (chainId === EChains.base) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.nativeBase}`]
      } else if (chainId === EChains.baseGoerli) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.nativeBaseGoerli}`]
      } else {
        return null
      }
    }
    case ETokenSymbol.matic: {
      if (chainId === EChains.polygon) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.nativePolygon}`]
      } else if (chainId === EChains.mumbai) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.nativeMumbai}`]
      } else {
        return null
      }
    }
    case ETokenSymbol.usdc: {
      if (chainId === EChains.polygon) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.usdcBridgedPolygon}`]
      } else if (chainId === EChains.mumbai) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.usdcMumbai}`]
      } else if (chainId === EChains.base) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.usdcBase}`]
      } else if (chainId === EChains.baseGoerli) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.usdcBaseGoerli}`]
      } else {
        return null
      }
    }
    case ETokenSymbol.usdce: {
      if (chainId === EChains.polygon) {
        return configs.escrowContracts[`${chainId}_${ETokenAddress.usdcPolygon}`]
      } else {
        return null
      }
    }
    default:
      return null
  }

}

export default defineEscrowAddressByTokenSymbol