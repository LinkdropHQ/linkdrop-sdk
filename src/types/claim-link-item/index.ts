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
  transfer_id: string
  amount: string
  fee: string
  total_amount: string
  token: string
  chainId: number
  sender: string
  // ---- should be added
  expiration: string
  token_type: TTokenType
  // ---- should be added
  escrow: string
  version: string
  status: TClaimLinkItemStatus
  operations:  TClaimLinkItemOperation[]
}
