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
import TDepositERC20 from './deposit-erc20'
import TDepositNative from './deposit-native'
import TDepositERC721 from './deposit-erc721'
import TDepositERC1155 from './deposit-erc1155'
import TIsDepositWithAuthorizationAvailable from './is-deposit-with-authorization-available' 
import TGetDepositParams from './get-deposit-params'

interface IClaimLink {
  getCurrentFee: TGetCurrentFee
  redeem: TRedeem
  depositWithAuthorization: TDepositWithAuthorization
  updateAmount: TUpdateAmount
  _defineDomain: TDefineDomain
  generateClaimUrl: TGenerateClaimUrl
  getStatus: TGetStatus
  deposit: TDeposit
  _defineValue: TDefineValue
  _depositERC20: TDepositERC20
  getDepositParams: TGetDepositParams
  _depositNative: TDepositNative
  _depositERC721: TDepositERC721
  _depositERC1155: TDepositERC1155
  isDepositWithAuthorizationAvailable: TIsDepositWithAuthorizationAvailable
}

export {
  TGetCurrentFee,
  TRedeem,
  TDepositERC1155,
  TDepositWithAuthorization,
  TIsDepositWithAuthorizationAvailable,
  TDepositERC721,
  TConstructorArgs,
  TUpdateAmount,
  TGetDepositParams,
  TGenerateClaimUrl,
  TDefineDomain,
  TGetStatus,
  TDeposit,
  TDefineValue,
  TDepositERC20,
  TDepositNative
}

export default IClaimLink
