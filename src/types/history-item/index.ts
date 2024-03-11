import { TTokenType, TOperationStatus, TClaimLinkSource, TTransferStatus } from ".."

export type THistoryItemOperation = {
  type: string
  timestamp: string
  txHash?: string
  status: TOperationStatus
  receiver: string
}

export type THistoryItem = {
  transferId?: string
  amount?: string
  feeAmount?: string
  feeToken?: string
  totalAmount?: string
  token: string
  chainId?: number
  sender: string
  expiration: number
  createdAt?: string
  updatedAt?: string
  tokenType?: TTokenType
  escrow: string
  version: string
  tokenId?: string
  status: TTransferStatus
  operations:  THistoryItemOperation[]
  source: TClaimLinkSource
}
