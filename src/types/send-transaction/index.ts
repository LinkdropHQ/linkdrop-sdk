import type { TTransactionType } from '../transaction-type'

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
  hash: string,
  type?: TTransactionType
}>
