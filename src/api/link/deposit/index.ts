import { TDeposit } from './types'
import { request, defineHeaders } from '../../../helpers'

const deposit: TDeposit = (
  apiHost,
  apiKey,
  token,
  token_type,
  sender,
  escrow,
  transfer_id,
  expiration,
  hash,
  transaction_type,
  fee_authorization,
  amount,
  fee_amount,
  total_amount,
  fee_token,
  encrypted_sender_message
) => {
  return request(`${apiHost}/deposit`, {
    headers: defineHeaders(apiKey),
    method: 'POST',
    body: JSON.stringify({
      sender,
      escrow,
      transfer_id,
      token,
      token_type,
      expiration,
      hash,
      fee_authorization,
      amount,
      fee_amount,
      total_amount,
      fee_token,
      encrypted_sender_message,
      transaction_type
    })
  })
}

export default deposit