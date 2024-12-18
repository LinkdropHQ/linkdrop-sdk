import { TTokenType } from '../../../types'

type TDepositERC1155Response = {
  success: boolean,
  tx_hash: string
}

export type TDepositERC1155 = (
  apiHost: string,
  apiKey: string | null,
  token: string,
  token_type: TTokenType,
  sender: string,
  escrow: string,
  transfer_id: string,
  expiration: number,
  tx_hash: string,
  fee_authorization: string,
  token_id: string,
  amount: string,
  fee_amount: string,
  total_amount: string,
  fee_token: string,
  encrypted_sender_message?: string
) => Promise<TDepositERC1155Response>