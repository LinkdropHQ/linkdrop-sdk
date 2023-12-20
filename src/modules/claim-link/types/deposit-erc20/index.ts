import { TSendTransaction, TDepositResult } from "../../../../types"

type TDepositArgs = {
  sendTransaction: TSendTransaction
}

type TDepositERC20 = ({
  sendTransaction
}: TDepositArgs) => Promise<TDepositResult>

export default TDepositERC20
