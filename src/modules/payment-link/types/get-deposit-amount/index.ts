type TGetDepositAmount = (link: string) => Promise<
  { amount: string, expiration: string }
>

export default TGetDepositAmount