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
      escrowAddress !== EEscrowAddress.base
    ) && chainId === EChains.base
  ) {
    return false
  }

  if (
    (
      escrowAddress !== EEscrowAddress.polygon
    ) && chainId === EChains.polygon
  ) {
    return false
  }

  if (
    (
      escrowAddress !== EEscrowAddress.mumbai
    ) && chainId === EChains.mumbai
  ) {
    return false
  }

  if (
    (
      escrowAddress !== EEscrowAddress.baseGoerli
    ) && chainId === EChains.baseGoerli
  ) {
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect