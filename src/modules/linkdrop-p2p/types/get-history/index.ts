import { TClaimLinkItem } from "../../../../types"

export type TGetHistoryArgs = {
  sender: string
  chainId: number
  onlyActive?: boolean
  offset?: number
  limit?: number
}

type TGetHistory = ({
  sender,
  chainId,
  onlyActive,
  offset,
  limit
}: TGetHistoryArgs) => Promise<({
  claimLinks: TClaimLinkItem[],
  resultSet: {
    total: number
    count: number
    offset: number
  }
})>

export default TGetHistory