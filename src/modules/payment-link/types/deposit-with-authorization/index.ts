import { TSignTypedData } from "../../../../types"

type TDepositWithAuthorizationArgs = {
  signTypedData: TSignTypedData
}

type TDepositWithAuthorization = ({
  signTypedData
}: TDepositWithAuthorizationArgs) => Promise<string> // txhash

export default TDepositWithAuthorization
