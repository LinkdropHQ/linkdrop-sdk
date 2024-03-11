type TGetCurrentFee = (
  amount: string
) => Promise<{
  amount: string
  total_amount: string
  max_transfer_amount: string
  min_transfer_amount: string
  fee_token: string
  fee_amount: string
  fee_authorization: string
}>

export default TGetCurrentFee