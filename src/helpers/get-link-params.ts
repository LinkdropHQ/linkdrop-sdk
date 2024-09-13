import { linkApi } from '../api'
import { TLinkParams } from '../types'
import { ethers } from 'ethers'

const getLinkParams = async (
  apiHost: string,
  claimCode: string
) => {
  let linkId
  if (claimCode.startsWith('0x')) {
    linkId = claimCode
  } else {
    const linkKey = ethers.utils.id(claimCode)
    linkId = new ethers.Wallet(linkKey).address
  }

  const linkParams = await linkApi.getParams(
    apiHost,
    linkId
  )
  const { success, data } = linkParams.data
  if (success) {
    const {
      creator_address,
      sponsored,
      chain_id,
      campaign_number,
      token_address,
      token_standard,
      symbol,
      claim_pattern,
      token_id,
      token_amount,
      sender_signature,
      proxy_contract_version,
      wei_amount,
      expiration_time,
      wallet,
      claiming_finished_description,
      claiming_finished_button_title,
      claiming_finished_button_url,
      claiming_finished_button_on,
      preferred_wallet_on,
      linkdrop_token,
      token_image,
      token_name,
      additional_wallets_on,
      factory_address
    } : TLinkParams = data

    return {
      creator_address,
      factory_address,
      sponsored,
      chain_id,
      campaign_number,
      token_address,
      token_standard,
      symbol,
      claim_pattern,
      token_id,
      token_amount,
      sender_signature,
      proxy_contract_version,
      wei_amount,
      expiration_time,
      wallet,
      claiming_finished_description,
      claiming_finished_button_title,
      claiming_finished_button_url,
      claiming_finished_button_on,
      preferred_wallet_on,
      linkdrop_token,
      token_image,
      token_name,
      additional_wallets_on
    }
  }
}

export default getLinkParams