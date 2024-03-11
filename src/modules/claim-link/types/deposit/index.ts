import { TSendTransaction, TDepositResult } from "../../../../types"

type TDepositArgs = {
  sendTransaction: TSendTransaction
}

type TDeposit = ({
  sendTransaction
}: TDepositArgs) => Promise<TDepositResult>

export default TDeposit
