import { ETokenType } from '../../../types'

type TDepositWithAuthResponse = {
  success: boolean,
  tx_hash: string
}

export type TDepositWithAuth = (
  apiHost: string,
  apiKey: string | null,
  token: string,
  token_type: ETokenType,
  sender: string,
  escrow: string,
  transfer_id: string,
  expiration: number,
  authorization: string,
  authorization_selector: string,
  fee_authorization: string,
  amount: string,
  fee_amount: string,
  total_amount: string
) => Promise<TDepositWithAuthResponse>