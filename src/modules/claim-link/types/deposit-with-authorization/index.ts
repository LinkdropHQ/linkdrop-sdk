import { TSignTypedData, TGetRandomBytes, TDepositResult } from "../../../../types"

type TDepositWithAuthorizationArgs = {
  signTypedData: TSignTypedData
}

type TDepositWithAuthorization = ({
  signTypedData
}: TDepositWithAuthorizationArgs) => Promise<TDepositResult>

export default TDepositWithAuthorization
