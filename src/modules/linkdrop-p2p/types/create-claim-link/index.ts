import { TTokenType } from "../../../../types"
import ClaimLink from "../../../claim-link"

export type TCreateClaimLinkArgs = {
  from: string
  token: string
  amount: string
  expiration?: string
  chainId: number
  tokenType: TTokenType
}

type TCreateClaimLink = ({
  from,
  token,
  amount,
  expiration,
  chainId
}: TCreateClaimLinkArgs) => Promise<ClaimLink | void>

export default TCreateClaimLink