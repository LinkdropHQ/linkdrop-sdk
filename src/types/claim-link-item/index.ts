import { TTokenType } from "../token-type"

export type TClaimLinkItemStatus = 'created' | 'depositing' | 'deposited' | 'redeemed'| 'redeeming' | 'error' | 'refunded' | 'refunding' | 'cancelled'

export type TClaimLinkItemOperationStatus = 'pending' | 'completed' | 'error'


export type TClaimLinkItemOperation = {
  type: string
  timestamp: string
  txHash: string
  status: TClaimLinkItemOperationStatus
  receiver: string
}

export type TClaimLinkItem = {
  transferId: string
  amount: string
  fee: string
  totalAmount: string
  token: string
  chainId: number
  sender: string
  // ---- should be added
  expiration: string
  tokenType: TTokenType
  // ---- should be added
  escrow: string
  version: string
  status: TClaimLinkItemStatus
  operations:  TClaimLinkItemOperation[]
}
