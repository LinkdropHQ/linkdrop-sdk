import PaymentLink from "../../../payment-link"

type TGetPaymentLink = (claimUrl: string) => Promise<PaymentLink | void>

export default TGetPaymentLink