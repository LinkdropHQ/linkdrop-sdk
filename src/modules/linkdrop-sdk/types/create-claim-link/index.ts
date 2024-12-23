import {
  TTokenType,
  TSignTypedData
} from "../../../../types"
import ClaimLink from "../../../claim-link"

export type TCreateClaimLinkArgs = {
  from: string
  chainId: number
  tokenType: TTokenType
  token?: string
  amount?: string
  expiration?: number
  tokenId?: string
  message?: string
  signTypedData?: TSignTypedData,
}

type TCreateClaimLink = ({
  from,
  chainId,
  token,
  tokenType,
  amount,
  expiration,
  tokenId,
  message,
  signTypedData
}: TCreateClaimLinkArgs) => Promise<ClaimLink>

export default TCreateClaimLink