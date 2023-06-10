import TCreateLinkdrop from './create-linkdrop'
import TGetLinkdrop from './get-linkdrop'
import TGetCurrentFee from './get-current-fee'
import TFetchHistory from './fetch-history'
import TGetDepositAmount from './get-deposit-amount'
import TRedeem from './redeem'
import TGetApiHost from './get-api-host'
import TParseURL from './parse-url'

interface ILinkSDK {
  createLinkdrop: TCreateLinkdrop
  fetchHistory: TFetchHistory
  getCurrentFee: TGetCurrentFee
  getDepositAmount: TGetDepositAmount
  getLinkdrop: TGetLinkdrop
  redeem: TRedeem
  getApiHost: TGetApiHost
  _parseUrl: TParseURL
}

export { TCreateLinkdrop, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop, TRedeem, TGetApiHost, TParseURL }
export default ILinkSDK
