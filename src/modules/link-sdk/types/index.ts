import TCreateLinkdrop from './create-linkdrop'
import TGetLinkdrop from './get-linkdrop'
import TGetCurrentFee from './get-current-fee'
import TFetchHistory from './fetch-history'
import TGetDepositAmount from './get-deposit-amount'
import TRedeem from './redeem'

interface ILinkSDK {
  createLinkdrop: TCreateLinkdrop
  fetchHistory: TFetchHistory
  getCurrentFee: TGetCurrentFee
  getDepositAmount: TGetDepositAmount
  getLinkdrop: TGetLinkdrop
  redeem: TRedeem
}

export { TCreateLinkdrop, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop, TRedeem }
export default ILinkSDK
