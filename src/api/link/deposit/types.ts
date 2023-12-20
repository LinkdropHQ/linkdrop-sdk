import { ETokenType } from '../../../types'

type TDepositResponse = {
  success: boolean,
  tx_hash: string
}

export type TDeposit = (
  apiHost: string,
  apiKey: string | null,
  token: string,
  token_type: ETokenType,
  sender: string,
  escrow: string,
  transfer_id: string,
  expiration: number,
  tx_hash: string,
  fee_authorization: string,
  amount: string,
  fee_amount: string,
  total_amount: string,
  fee_token: string
) => Promise<TDepositResponse>