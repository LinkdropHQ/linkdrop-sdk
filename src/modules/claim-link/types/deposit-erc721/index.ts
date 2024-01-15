import { TSendTransaction, TDepositResult } from "../../../../types"

type TDepositArgs = {
  sendTransaction: TSendTransaction
}

type TDepositERC721 = ({
  sendTransaction
}: TDepositArgs) => Promise<TDepositResult>

export default TDepositERC721
