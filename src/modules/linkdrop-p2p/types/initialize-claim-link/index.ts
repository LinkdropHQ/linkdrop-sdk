import { EChains, TTokenType, ETokenAddress } from "../../../../types"
import ClaimLink from "../../../claim-link"

export type TInitializeClaimLinkArgs = {
  sender: string
  token?: ETokenAddress
  amount: string
  expiration?: string
  chainId: number
  apiHost: string
  apiKey: string
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  tokenType: TTokenType
}

type TInitializeClaimLink = ({
  token,
  expiration,
  chainId,
  baseUrl,
  amount,
  sender, 
  apiHost, 
  apiKey,
  transferId,
  claimUrl,
  tokenType
}: TInitializeClaimLinkArgs) => Promise<(ClaimLink | void)>

export default TInitializeClaimLink