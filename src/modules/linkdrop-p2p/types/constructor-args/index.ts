import { TGetRandomBytes, TDeploymentType } from "../../../../types"

type TConstructorArgs = {
  apiKey?: string
  baseUrl: string
  apiUrl?: string
  deployment?: TDeploymentType
  getRandomBytes: TGetRandomBytes
}

export default TConstructorArgs