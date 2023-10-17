import { TSignTypedData } from "../../../../types"

type TDepositWithAuthorizationArgs = {
  signTypedData: TSignTypedData
}

type TDepositWithAuthorization = ({
  signTypedData
}: TDepositWithAuthorizationArgs) => Promise<string | void> // txhash

export default TDepositWithAuthorization
