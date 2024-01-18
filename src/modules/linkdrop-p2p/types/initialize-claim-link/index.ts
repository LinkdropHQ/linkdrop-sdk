import { EChains, ETokenType, ETokenAddress, TGetRandomBytes } from "../../../../types"
import ClaimLink from "../../../claim-link"

export type TInitializeClaimLinkArgs = {
  sender: string
  token: ETokenAddress
  amount: string
  expiration: number
  chainId: number
  apiUrl: string
  apiKey: string | null
  baseUrl?: string
  transferId?: string
  claimUrl?: string
  feeAmount?: string
  totalAmount?: string
  feeToken?: string
  feeAuthorization?: string
  tokenType: ETokenType,
  tokenId?: string
  forRecipient?: boolean
}

type TInitializeClaimLink = ({
  token,
  expiration,
  chainId,
  baseUrl,
  amount,
  sender, 
  apiUrl, 
  apiKey,
  transferId,
  claimUrl,
  tokenType,
  feeAmount,
  totalAmount,
  feeAuthorization,
  feeToken,
  tokenId,
  forRecipient
}: TInitializeClaimLinkArgs) => Promise<(ClaimLink)>

export default TInitializeClaimLink