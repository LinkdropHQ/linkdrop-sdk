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
}

type TCreateClaimLink = ({
  from,
  chainId,
  token,
  tokenType,
  amount,
  expiration,
  tokenId
}: TCreateClaimLinkArgs) => Promise<ClaimLink>

export default TCreateClaimLink