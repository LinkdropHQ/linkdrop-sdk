import TCreateLinkdrop from './create-linkdrop'
import TGetLinkdrop from './get-linkdrop'
import TGetCurrentFee from './get-current-fee'
import TFetchHistory from './fetch-history'
import TGetDepositAmount from './get-deposit-amount'

interface ILinkSDK {
  createLinkdrop: TCreateLinkdrop
  fetchHistory: TFetchHistory
  getCurrentFee: TGetCurrentFee
  getDepositAmount: TGetDepositAmount
  getLinkdrop: TGetLinkdrop
}

export { TCreateLinkdrop, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop }
export default ILinkSDK
