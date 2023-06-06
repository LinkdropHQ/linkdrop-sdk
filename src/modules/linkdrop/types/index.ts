import TGetNextTransferId from './get-next-transfer-id'
import TInitialize from './initialize'
import TGetDepositAmount from './get-deposit-amount'

interface ILinkdrop {
  token: string
  sender: string
  transferId?: string
  amount?: string

  _getNextTransferId: TGetNextTransferId
  getDepositAmount: TGetDepositAmount
  initialize: TInitialize
}
export { TInitialize, TGetNextTransferId, TGetDepositAmount }
export default ILinkdrop