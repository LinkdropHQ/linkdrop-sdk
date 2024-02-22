type TGetDepositParams = () => {
  to: string,
  value: string,
  gasLimit: number | null,
  data: string
}

export default TGetDepositParams