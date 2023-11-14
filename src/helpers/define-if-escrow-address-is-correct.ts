import { EEscrowAddress, EChains } from "../types"

type TDefineIfEscrowAddressIsCorrect = (
  chainId: number | null,
  escrowAddress: string
) => boolean

const defineIfEscrowAddressIsCorrect: TDefineIfEscrowAddressIsCorrect = (
  chainId,
  escrowAddress
) => {

  if (!chainId || !escrowAddress) {
    return false
  }

  if (
    (
      escrowAddress !== EEscrowAddress.nativeBase &&
      escrowAddress !== EEscrowAddress.usdcBase
    ) && chainId === EChains.base
  ) {
    return false
  }

  if (
    (
      escrowAddress !== EEscrowAddress.nativePolygon &&
      escrowAddress !== EEscrowAddress.usdcPolygon &&
      escrowAddress !== EEscrowAddress.usdcBridgedPolygon
    ) && chainId === EChains.polygon
  ) {
    return false
  }

  if (
    (
      escrowAddress !== EEscrowAddress.nativeMumbai &&
      escrowAddress !== EEscrowAddress.usdcMumbai
    ) && chainId === EChains.mumbai
  ) {
    return false
  }

  if (
    (
      escrowAddress !== EEscrowAddress.nativeBaseGoerli &&
      escrowAddress !== EEscrowAddress.usdcBaseGoerli
    ) && chainId === EChains.baseGoerli
  ) {
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect