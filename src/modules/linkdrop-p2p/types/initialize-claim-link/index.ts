import { EChains, TTokenType, ETokenAddress } from "../../../../types"
import ClaimLink from "../../../claim-link"

export type TInitializeClaimLinkArgs = {
  sender: string
  token?: ETokenAddress
  amount: string
  expiration?: number
  chainId: number
  apiHost: string
  apiKey: string | null
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  tokenType: TTokenType
  forReciever?: boolean
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
  tokenType,
  forReciever
}: TInitializeClaimLinkArgs) => Promise<(ClaimLink)>

export default TInitializeClaimLink