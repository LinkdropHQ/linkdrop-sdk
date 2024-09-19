import {
  TSignTypedData,
  TDepositResult,
  TDomain,
  EAuthorizationMethod
} from "../../../../types"

type TDepositWithAuthorizationArgs = {
  signTypedData: TSignTypedData,
  authConfig?: {
    domain: TDomain
    authorizationMethod: EAuthorizationMethod
  }
}

type TDepositWithAuthorization = ({
  signTypedData,
  authConfig
}: TDepositWithAuthorizationArgs) => Promise<TDepositResult>

export default TDepositWithAuthorization
