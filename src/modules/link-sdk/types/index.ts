import TCreateLinkdrop from './create-linkdrop'
import TGetLinkdrop from './get-linkdrop'
import TGetCurrentFee from './get-current-fee'
import TGetDepositAmount from './get-deposit-amount'
import TRedeem from './redeem'
import TGetApiHost from './get-api-host'
import TParseURL from './parse-url'
import TGetChainId from './get-chain-id'

interface ILinkSDK {
  createLinkdrop: TCreateLinkdrop
  getCurrentFee: TGetCurrentFee
  getDepositAmount: TGetDepositAmount
  getLinkdrop: TGetLinkdrop
  redeem: TRedeem
  getApiHost: TGetApiHost
  _parseUrl: TParseURL
}

export { TCreateLinkdrop, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop, TRedeem, TGetApiHost, TParseURL, TGetChainId }
export default ILinkSDK
