import TGetCurrentFee from './get-current-fee'
import TRedeem from './redeem'
import TDepositWithAuthorization from './deposit-with-authorization'
import TConstructorArgs from './constructor-args' 
import TUpdateAmount from './update-amount'
import TGetNextTransferId from './get-next-transfer-id'
import TGenerateClaimUrl from './generate-claim-url'
import TDefineDomain from './define-domain'
import TGetStatus from './get-status'

interface IClaimLink {
  _getCurrentFee: TGetCurrentFee
  redeem: TRedeem
  depositWithAuthorization: TDepositWithAuthorization
  updateAmount: TUpdateAmount
  _getNextTransferId: TGetNextTransferId
  _defineDomain: TDefineDomain
  generateClaimUrl: TGenerateClaimUrl
  getStatus: TGetStatus
}

export {
  TGetCurrentFee,
  TRedeem,
  TDepositWithAuthorization,
  TConstructorArgs,
  TUpdateAmount,
  TGetNextTransferId,
  TGenerateClaimUrl,
  TDefineDomain,
  TGetStatus
}

export default IClaimLink
