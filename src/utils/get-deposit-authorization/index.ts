
import { TDomain, TSignTypedData, ETokenAddress } from '../../types'
import getDepositAuthorizationBase from './get-deposit-authorization-base'
import getDepositAuthorizationPolygonBridgedUSDC from './get-deposit-authorization-polygon-bridged-usdc'
import getDepositAuthorizationPolygonNativeUSDC from './get-deposit-authorization-polygon-native-usdc'
import getDepositAuthorizationMumbai from './get-deposit-authorization-mumbai'

import getDepositAuthorizationArbitrum from './get-deposit-authorization-arbitrum'
import getDepositAuthorizationAvalanche from './get-deposit-authorization-avalanche'
import getDepositAuthorizationOptimism from './get-deposit-authorization-optimism'
import { EChains } from '../../types'

async function getDepositAuthorization(
  signTypedData: TSignTypedData,
  sender: string,
  to: string,
  amount: string,
  validAfter: number,
  validBefore: number,
  transferId: string,
  expiration: string,
  domain: TDomain,
  chainId: number,
  token: string,
  feeAmount: string
) {
  if (chainId === EChains.polygon) {
    if (token === ETokenAddress.usdcBridgedPolygon) {
      return getDepositAuthorizationPolygonBridgedUSDC(
        signTypedData,
        sender,
        to,
        amount,
        validAfter,
        validBefore,
        transferId,
        expiration,
        feeAmount,
        domain
      )
    }

    return getDepositAuthorizationPolygonNativeUSDC(
      signTypedData,
      sender,
      to,
      amount,
      validAfter,
      validBefore,
      transferId,
      expiration,
      feeAmount,
      domain
    )
    
  }

  if (chainId === EChains.base || chainId === EChains.baseGoerli) {
    return getDepositAuthorizationBase(
      signTypedData,
      sender,
      to,
      amount,
      validAfter,
      validBefore,
      transferId,
      expiration,
      feeAmount,
      domain
    )
  }

  if (chainId === EChains.avalanche) {
    return getDepositAuthorizationAvalanche(
      signTypedData,
      sender,
      to,
      amount,
      validAfter,
      validBefore,
      transferId,
      expiration,
      feeAmount,
      domain
    )
  }

  if (chainId === EChains.optimism) {
    return getDepositAuthorizationOptimism(
      signTypedData,
      sender,
      to,
      amount,
      validAfter,
      validBefore,
      transferId,
      expiration,
      feeAmount,
      domain
    )
  }

  if (chainId === EChains.arbitrum) {
    return getDepositAuthorizationArbitrum(
      signTypedData,
      sender,
      to,
      amount,
      validAfter,
      validBefore,
      transferId,
      expiration,
      feeAmount,
      domain
    )
  }

  return getDepositAuthorizationMumbai(
    signTypedData,
    sender,
    to,
    amount,
    validAfter,
    validBefore,
    transferId,
    expiration,
    feeAmount,
    domain
  )
}

export default getDepositAuthorization
