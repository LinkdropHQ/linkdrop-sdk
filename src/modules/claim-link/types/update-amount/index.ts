type TUpdateAmountResult = {
  amount: string
  fee: string
  totalAmount: string
}

type TUpdateAmount = (
  amount: string
) => Promise<TUpdateAmountResult>

export default TUpdateAmount