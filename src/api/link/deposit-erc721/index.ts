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
  tx_hash,
  fee_authorization,
  token_id,
  fee_amount,
  total_amount,
  fee_token
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
      tx_hash,
      fee_authorization,
      token_id,
      fee_amount,
      total_amount,
      fee_token,
      amount: '1'
    })
  })
}

export default depositERC721