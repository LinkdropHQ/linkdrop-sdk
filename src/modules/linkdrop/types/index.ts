import TGetNextTransferId from './get-next-transfer-id'
import TInitialize from './initialize'
import TGenerateLink from './generate-link'

interface ILinkdrop {
  token: string
  sender: string
  transferId?: string
  amount?: string

  _getNextTransferId: TGetNextTransferId
  initialize: TInitialize
  generateLink: TGenerateLink
}
export { TInitialize, TGetNextTransferId, TGenerateLink }
export default ILinkdrop