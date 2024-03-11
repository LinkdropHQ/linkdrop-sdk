import { TSendTransaction, TDepositResult } from "../../../../types"

type TDepositArgs = {
  sendTransaction: TSendTransaction
}

type TDepositERC1155 = ({
  sendTransaction
}: TDepositArgs) => Promise<TDepositResult>

export default TDepositERC1155
