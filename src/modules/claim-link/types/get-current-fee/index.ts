type TGetCurrentFee = (token: string) => Promise<{
  amount: string,
  total_amount: string,
  fee: string
  min_transfer_amount: string
  max_transfer_amount: string
}>

export default TGetCurrentFee