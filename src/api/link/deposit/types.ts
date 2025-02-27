import { TTokenType, TTransactionType } from '../../../types'

type TDepositResponse = {
  success: boolean,
}

export type TDeposit = (
  apiHost: string,
  apiKey: string | null,
  token: string,
  token_type: TTokenType,
  sender: string,
  escrow: string,
  transfer_id: string,
  expiration: number,
  hash: string,
  transaction_type: TTransactionType,
  fee_authorization: string,
  amount: string,
  fee_amount: string,
  total_amount: string,
  fee_token: string,
  encrypted_sender_message?: string
) => Promise<TDepositResponse>