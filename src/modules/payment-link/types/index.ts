import TGetCurrentFee from './get-current-fee'
import TGetDepositAmount from './get-deposit-amount'
import TRedeem from './redeem'
import TGetApiHost from './get-api-host'
import TParseURL from './parse-url'
import TGetChainId from './get-chain-id'
import TDepositWithAuthorization from './deposit-with-authorization'
import TConstructorArgs from './constructor-args' 
import TUpdateAmount from './update-amount'
import TGetNextTransferId from './get-next-transfer-id'
import TGenerateClaimUrl from './generate-claim-url'
import TInitialize from './initialize'
import TDefineDomain from './define-domain'

interface IPaymentLink {
  getCurrentFee: TGetCurrentFee
  getDepositAmount: TGetDepositAmount
  getApiHost: TGetApiHost
  _parseUrl: TParseURL,
  redeem: TRedeem
  initialize: TInitialize
  depositWithAuthorization: TDepositWithAuthorization
  updateAmount: TUpdateAmount
  _getNextTransferId: TGetNextTransferId
  _defineDomain: TDefineDomain
  generateClaimUrl: TGenerateClaimUrl
}

export {
  TGetCurrentFee,
  TGetDepositAmount,
  TInitialize,
  TRedeem,
  TGetApiHost,
  TParseURL,
  TGetChainId,
  TDepositWithAuthorization,
  TConstructorArgs,
  TUpdateAmount,
  TGetNextTransferId,
  TGenerateClaimUrl,
  TDefineDomain
}

export default IPaymentLink
