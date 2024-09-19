
import { TDomain, TSignTypedData, ETokenAddress, EAuthorizationMethod } from '../../types'
import getDepositAuthorizationApprove from './get-deposit-authorization-approve'
import getDepositAuthorizationReceive from './get-deposit-authorization-receive'
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
  feeAmount: string,
  authorizationMethod?: EAuthorizationMethod
) {
  if (authorizationMethod) {
    if (authorizationMethod === EAuthorizationMethod.ApproveWithAuthorization) {
      return getDepositAuthorizationApprove(
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

    return getDepositAuthorizationReceive(
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
  if (chainId === EChains.polygon) {
    if (token === ETokenAddress.usdcBridgedPolygon) {
      return getDepositAuthorizationApprove(
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
  }

  return getDepositAuthorizationReceive(
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
