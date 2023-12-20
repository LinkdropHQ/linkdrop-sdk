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
  tx_hash,
  fee_authorization,
  amount,
  fee_amount,
  total_amount,
  fee_token
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
      tx_hash,
      fee_authorization,
      amount,
      fee_amount,
      total_amount,
      fee_token
    })
  })
}

export default deposit