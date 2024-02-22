type TSendTransactionArgs = {
  to: string,
  value: string,
  data: string
}

export type TSendTransaction = ({
  to,
  value,
  data
}: TSendTransactionArgs) => Promise<{
  hash: string
}>
