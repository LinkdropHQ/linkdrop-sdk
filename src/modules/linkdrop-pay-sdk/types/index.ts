import TCreatePaymentLink from './create-payment-link'
import TRetrievePaymentLink from './retrieve-payment-link'
import TGetPaymentLink from './get-payment-link'
import TConstructorArgs from './constructor-args'

interface ILinkdrop {
  apiKey: string
  baseUrl: string

  createPaymentLink: TCreatePaymentLink
  retrievePaymentLink: TRetrievePaymentLink
  getPaymentLink: TGetPaymentLink
}
export {
  TCreatePaymentLink,
  TConstructorArgs,
  TGetPaymentLink,
  TRetrievePaymentLink
}
export default ILinkdrop