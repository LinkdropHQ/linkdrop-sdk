import { TOperationStatus } from ".."

export type TClaimLinkOperation = {
  type: string
  timestamp: string
  txHash?: string
  status: TOperationStatus
  receiver: string
}
