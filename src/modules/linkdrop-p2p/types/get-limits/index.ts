import { EChains, ETokenType } from "../../../../types"

export type TGetLimitsArgs = {
  token?: string
  tokenType: ETokenType
  chainId: EChains
}

type TGetLimits = ({
  token,
  tokenType
}: TGetLimitsArgs) => Promise<({
  minTransferAmount: string,
  maxTransferAmount: string
})>

export default TGetLimits