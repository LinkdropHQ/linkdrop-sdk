import { request, defineHeaders } from '../../../helpers'
import { TRedeemLinkAndRegisterStealthKeys } from './types'

const redeemLinkAndRegisterStealthKeys: TRedeemLinkAndRegisterStealthKeys = (
  apiHost,
  apiKey,
  receiver,
  transfer_id,
  receiver_sig,
  spending_pub_key_prefix,
  spending_pub_key_x,
  viewing_pub_key_prefix,
  viewing_pub_key_x,
  stealth_keys_authorization,
  token?,
  sender?,
  escrow?
) => {
  return request(`${apiHost}/redeem-and-register-stealth-keys`, {
    headers: defineHeaders(apiKey),
    method: 'POST',
    body: JSON.stringify({
      sender,
      token,
      receiver,
      escrow,
      transfer_id,
      receiver_sig,
      spending_pub_key_prefix,
      spending_pub_key_x,
      viewing_pub_key_prefix,
      viewing_pub_key_x,
      stealth_keys_authorization
    })
  })
}

export default redeemLinkAndRegisterStealthKeys