type TSendTransactionArgs = {
  to: string,
  value: string,
  gasLimit: number | null,
  data: string
}

export type TSendTransaction = ({
  to,
  value,
  gasLimit,
  data
}: TSendTransactionArgs) => Promise<{
  hash: string
}>
