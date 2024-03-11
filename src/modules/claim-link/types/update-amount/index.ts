type TUpdateAmountResult = {
  amount: string
  feeAmount: string
  totalAmount: string
  feeToken: string
}

type TUpdateAmount = (
  amount: string
) => Promise<TUpdateAmountResult>

export default TUpdateAmount