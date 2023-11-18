import { TClaimLinkItem } from "../../../../types"

export type TGetHistoryArgs = {
  sender: string
  chainId: number
  onlyActive?: boolean
  offset?: number
  limit?: number
  tokenAddress?: string
}

type TGetHistory = ({
  sender,
  chainId,
  onlyActive,
  offset,
  limit,
  tokenAddress
}: TGetHistoryArgs) => Promise<({
  claimLinks: TClaimLinkItem[],
  resultSet: {
    total: number
    count: number
    offset: number
  }
})>

export default TGetHistory