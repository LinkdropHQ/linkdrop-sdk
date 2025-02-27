import { TDepositERC721 } from './types'
import { request, defineHeaders } from '../../../helpers'

const depositERC721: TDepositERC721 = (
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
  token_id,
  fee_amount,
  total_amount,
  fee_token,
  encrypted_sender_message
) => {
  return request(`${apiHost}/deposit-erc721`, {
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
      token_id,
      fee_amount,
      total_amount,
      fee_token,
      amount: '1',
      encrypted_sender_message,
      transaction_type
    })
  })
}

export default depositERC721