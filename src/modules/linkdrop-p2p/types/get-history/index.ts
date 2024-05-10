import { THistoryItem } from "../../../../types"

export type TGetHistoryArgs = {
  sender: string
  chainId: number
  onlyActive?: boolean
  offset?: number
  limit?: number
  token?: string
}

type TGetHistory = ({
  sender,
  chainId,
  onlyActive,
  offset,
  limit,
  token
}: TGetHistoryArgs) => Promise<({
  claimLinks: THistoryItem[],
  resultSet: {
    total: number
    count: number
    offset: number
  }
})>

export default TGetHistory