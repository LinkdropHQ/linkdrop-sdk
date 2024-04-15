type TRedeemLinkAndRegisterStealthKeysResponse = {
  success: boolean,
  tx_hash: string
}

export type TRedeemLinkAndRegisterStealthKeys = (
  apiHost: string,
  apiKey: string | null,
  receiver: string,
  transfer_id: string,
  receiver_sig: string,
  spending_pub_key_prefix: number,
  spending_pub_key: string,
  viewing_pub_key_prefix: number,
  viewing_pub_key:string,
  stealth_keys_authorization: string,
  token?: string,
  sender?: string,
  escrow?: string
) => Promise<TRedeemLinkAndRegisterStealthKeysResponse>

