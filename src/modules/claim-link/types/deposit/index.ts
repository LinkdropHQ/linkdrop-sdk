import { TSendTransaction, TGetRandomBytes, TDepositResult } from "../../../../types"

type TDepositArgs = {
  sendTransaction: TSendTransaction
  getRandomBytes: TGetRandomBytes
}

type TDeposit = ({
  sendTransaction,
  getRandomBytes
}: TDepositArgs) => Promise<TDepositResult | void> // txhash

export default TDeposit
