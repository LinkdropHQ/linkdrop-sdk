import * as configs from '../configs'
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