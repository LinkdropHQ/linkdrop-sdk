import { request, defineHeaders } from '../../../helpers'
import { TDepositWithAuth } from './types'

const depositWithAuthorization: TDepositWithAuth = (
  apiHost,
  apiKey,
  token,
  token_type,
  sender,
  escrow,
  transfer_id,
  expiration,
  authorization,
  authorization_selector,
  fee_authorization,
  amount,
  fee_amount,
  total_amount,
  encrypted_sender_message
) => {
  return request(`${apiHost}/deposit-with-authorization`, {
    headers: defineHeaders(apiKey),
    method: 'POST',
    body: JSON.stringify({
      sender,
      token,
      token_type,
      escrow,
      transfer_id,
      expiration,
      amount,
      authorization,
      authorization_selector,
      fee_amount,
      total_amount,
      fee_authorization,
      encrypted_sender_message
    })
  })
}

export default depositWithAuthorization