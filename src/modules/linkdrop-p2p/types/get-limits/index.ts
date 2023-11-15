import { EChains, TTokenType } from "../../../../types"

export type TGetLimitsArgs = {
  token?: string
  tokenType: TTokenType
  chainId: EChains
}

type TGetLimits = ({
  token,
  tokenType
}: TGetLimitsArgs) => Promise<({
  minTransferAmount: string,
  maxTransferAmount: string
} | void)>

export default TGetLimits