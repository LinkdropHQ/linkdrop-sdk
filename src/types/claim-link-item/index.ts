export type TClaimLinkItemStatus = 'created' | 'depositing' | 'deposited' | 'redeemed'| 'redeeming' | 'error' | 'refunded' | 'refunding' | 'cancelled'

export type TClaimLinkItemOperationStatus = 'pending' | 'completed' | 'error'


export type TClaimLinkItemOperation = {
  type: string
  timestamp: string
  tx_hash: string
  status: TClaimLinkItemOperationStatus
  receiver: string
}

export type TClaimLinkItem = {
  transfer_id: string
  amount: string
  fee: string
  token: string
  chain_id: number
  sender: string
  // ---- should be added
  expiration: string
  // ---- should be added
  escrow: string
  version: string
  status: TClaimLinkItemStatus
  operations:  TClaimLinkItemOperation[]
}
