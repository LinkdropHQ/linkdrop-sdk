import { TSendTransaction, TDepositResult } from "../../../../types"

type TDepositArgs = {
  sendTransaction: TSendTransaction
}

type TDepositNative = ({
  sendTransaction
}: TDepositArgs) => Promise<TDepositResult>

export default TDepositNative
