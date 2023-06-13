import TGetNextTransferId from './get-next-transfer-id'
import TInitialize from './initialize'
import TGetDepositAmount from './get-deposit-amount'
import TGenerateLink from './generate-link'

interface ILinkdrop {
  token: string
  sender: string
  transferId?: string
  amount?: string

  _getNextTransferId: TGetNextTransferId
  getDepositAmount: TGetDepositAmount
  initialize: TInitialize
  generateLink: TGenerateLink
}
export { TInitialize, TGetNextTransferId, TGetDepositAmount, TGenerateLink }
export default ILinkdrop