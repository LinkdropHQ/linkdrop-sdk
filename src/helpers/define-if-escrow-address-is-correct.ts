import * as configs from '../configs'
import escrows from '../configs/escrows'
import { TDeploymentType } from '../types'


type TDefineIfEscrowAddressIsCorrect = (
  escrowAddress: string,
  deployment: TDeploymentType
) => boolean

const defineIfEscrowAddressIsCorrect: TDefineIfEscrowAddressIsCorrect = (
  escrowAddress,
  deployment
) => {

  if (!escrowAddress) {
    return false
  }

  if (deployment === 'CBW') {
    if (escrowAddress !== configs.cbwEscrowContract) {

      // ----- quick fix for CBW 3.12.4-beta sdk version links
        if (
          escrows["3.1"].includes(escrowAddress)
        ) {
          return true
        }
      // ----- quick fix for CBW 3.12.4-beta sdk version links
      return false
    }
    return true
  }


  if (escrowAddress !== configs.mainEscrowContract) {
    return false
  }
  
  return true
}

export default defineIfEscrowAddressIsCorrect