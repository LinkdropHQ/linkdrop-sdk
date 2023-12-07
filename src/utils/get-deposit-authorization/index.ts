
import { TDomain, TSignTypedData, ETokenAddress } from '../../types'
import getDepositAuthorizationBase from './get-deposit-authorization-base'
import getDepositAuthorizationPolygonBridgedUSDC from './get-deposit-authorization-polygon-bridged-usdc'
import getDepositAuthorizationPolygonNativeUSDC from './get-deposit-authorization-polygon-native-usdc'
import getDepositAuthorizationMumbai from './get-deposit-authorization-mumbai'

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
  if (chainId === 137) {
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

  if (chainId === 8453 || chainId === 84531) {
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
