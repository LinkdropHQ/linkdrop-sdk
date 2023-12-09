import TGetCurrentFee from './get-current-fee'
import TRedeem from './redeem'
import TDepositWithAuthorization from './deposit-with-authorization'
import TConstructorArgs from './constructor-args' 
import TUpdateAmount from './update-amount'
import TGenerateClaimUrl from './generate-claim-url'
import TDefineDomain from './define-domain'
import TGetStatus from './get-status'
import TDeposit from './deposit'
import TDefineValue from './define-value'

interface IClaimLink {
  _getCurrentFee: TGetCurrentFee
  redeem: TRedeem
  depositWithAuthorization: TDepositWithAuthorization
  updateAmount: TUpdateAmount
  _defineDomain: TDefineDomain
  generateClaimUrl: TGenerateClaimUrl
  getStatus: TGetStatus
  deposit: TDeposit
  _defineValue: TDefineValue
}

export {
  TGetCurrentFee,
  TRedeem,
  TDepositWithAuthorization,
  TConstructorArgs,
  TUpdateAmount,
  TGenerateClaimUrl,
  TDefineDomain,
  TGetStatus,
  TDeposit,
  TDefineValue
}

export default IClaimLink
