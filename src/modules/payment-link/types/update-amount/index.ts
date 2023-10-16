type TUpdateAmountResult = {
  amount: string
  fee: string
  totalAmount: string
}

type TUpdateAmount = (
  amount: string
) => TUpdateAmountResult

export default TUpdateAmount