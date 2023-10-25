import { TSignTypedData, TGetRandomBytes, TDepositResult } from "../../../../types"

type TDepositWithAuthorizationArgs = {
  signTypedData: TSignTypedData
  getRandomBytes: TGetRandomBytes
}

type TDepositWithAuthorization = ({
  signTypedData,
  getRandomBytes
}: TDepositWithAuthorizationArgs) => Promise<TDepositResult | void> // txhash

export default TDepositWithAuthorization
