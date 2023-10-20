type TGetCurrentFee = (token: string) => Promise<{
  amount: string,
  total_amount: string,
  fee: string
}>

export default TGetCurrentFee