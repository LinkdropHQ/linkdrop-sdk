import { TTokenType, TClaimLinkSource, TOperationStatus } from ".."

export type TClaimLinkItemStatus = 'created' | 'depositing' | 'deposited' | 'redeemed'| 'redeeming' | 'error' | 'refunded' | 'refunding' | 'cancelled'

export type TClaimLinkItemOperation = {
  type: string
  timestamp: string
  tx_hash?: string
  status: TOperationStatus
  receiver: string
}

export type TClaimLinkItem = {
  transfer_id?: string
  amount: string
  fee_amount?: string
  fee_token?: string
  total_amount?: string
  token: string
  chain_id?: number
  sender: string
  expiration: number
  created_at?: string
  updated_at?: string
  token_type?: TTokenType
  escrow: string
  version: string
  token_id?: string
  status: TClaimLinkItemStatus
  operations:  TClaimLinkItemOperation[]
  source: TClaimLinkSource
  wallet: string | null
  
  claiming_finished_description: string | null
  claiming_finished_button_title: string  | null
  claiming_finished_button_url: string | null
  claiming_finished_button_on: boolean | null
  claiming_finished_auto_redirect: boolean | null
  preferred_wallet_on: boolean | null
  additional_wallets_on: boolean | null
  wei_amount: string | null
  encrypted_sender_message?: string

  // ONLY FOR SBT TOKENS
  token_image: string | null
  token_name: string | null
}
