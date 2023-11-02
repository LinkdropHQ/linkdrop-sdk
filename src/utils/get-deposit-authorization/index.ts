
import { TDomain, TSignTypedData } from '../../types'
import getDepositAuthorizationBase from './get-deposit-authorization-base'
import getDepositAuthorizationPolygon from './get-deposit-authorization-polygon'
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
    chainId: number
) {
  if (chainId === 137) return getDepositAuthorizationPolygon(
    signTypedData,
    sender,
    to,
    amount,
    validAfter,
    validBefore,
    transferId,
    expiration,
    domain
  )

  if (chainId === 8453) return getDepositAuthorizationBase(
    signTypedData,
    sender,
    to,
    amount,
    validAfter,
    validBefore,
    transferId,
    expiration,
    domain
  )

  return getDepositAuthorizationMumbai(
    signTypedData,
    sender,
    to,
    amount,
    validAfter,
    validBefore,
    transferId,
    expiration,
    domain
  )
}

export default getDepositAuthorization
