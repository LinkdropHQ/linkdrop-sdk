import PaymentLink from "../../../payment-link"

export type TRetrievePaymentLinkArgs = {
  chainId: number
  txHash?: string
  sender?: string
  transferId?: string
}

type TRetrievePaymentLink = ({
  chainId,
  txHash,
  sender,
  transferId
}: TRetrievePaymentLinkArgs) => Promise<PaymentLink | void>

export default TRetrievePaymentLink