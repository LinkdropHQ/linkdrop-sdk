import PaymentLink from "../../../payment-link"

export type TCreatePaymentLinkArgs = {
  from: string,
  token: string,
  amount: string,
  expiration: string,
  chainId: number
}

type TCreatePaymentLink = ({
  from,
  token,
  amount,
  expiration,
  chainId
}: TCreatePaymentLinkArgs) => Promise<PaymentLink | void>

export default TCreatePaymentLink