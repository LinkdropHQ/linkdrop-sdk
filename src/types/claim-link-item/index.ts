import { TTokenType } from "../token-type"

export type TClaimLinkItemStatus = 'created' | 'depositing' | 'deposited' | 'redeemed'| 'redeeming' | 'error' | 'refunded' | 'refunding' | 'cancelled'

export type TClaimLinkItemOperationStatus = 'pending' | 'completed' | 'error'


export type TClaimLinkItemOperation = {
  type: string
  timestamp: string
  tx_hash?: string

  status: TClaimLinkItemOperationStatus
  receiver: string
}

export type TClaimLinkItem = {
  transfer_id?: string
  amount: string
  fee_amount: string
  fee_token: string
  total_amount?: string
  token: string
  chain_id?: number
  sender: string
  // ---- should be added
  expiration: number
  created_at?: string
  updated_at?: string
  token_type?: TTokenType
  // ---- should be added
  escrow: string
  version: string
  status: TClaimLinkItemStatus
  operations:  TClaimLinkItemOperation[]
}
