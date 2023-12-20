import { TRequests } from './types'
import { createQueryString } from '../../helpers'

function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error(String(res.status))
    })
    .then((data) => data as TResponse)
}

const defineHeaders = (apiKey: string | null) => {
  const headers = {
    'content-type': 'application/json'
  }

  if (apiKey) {
    headers['authorization'] = `Bearer ${apiKey}`
  }

  return headers
}

const requests: TRequests = {
  redeemRecoveredLink: (
    apiHost,
    apiKey,
    receiver,
    sender,
    escrow,
    transfer_id,
    receiver_sig,
    sender_sig,
    token
  ) => {
    return request(`${apiHost}/redeem-recovered`, {
      headers: defineHeaders(apiKey),
      method: 'POST',
      body: JSON.stringify({
        receiver,
        sender,
        escrow,
        transfer_id,
        receiver_sig,
        sender_sig,
        token
      })
    })
  },

  redeemLink: (
    apiHost,
    apiKey,
    receiver,
    sender,
    escrow,
    transfer_id,
    receiver_sig,
    token
  ) => {
    return request(`${apiHost}/redeem`, {
      headers: defineHeaders(apiKey),
      method: 'POST',
      body: JSON.stringify({
        receiver,
        sender,
        escrow,
        transfer_id,
        receiver_sig,
        token
      })
    })
  },

  depositWithAuthorization: (
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
    total_amount
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
        fee_authorization
      })
    })
  },

  deposit: (
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
  },

  getTransferStatus: (
    apiHost,
    apiKey,
    transferId
  ) => {
    return request(`${apiHost}/payment-status/transfer/${transferId}`, {
      headers: defineHeaders(apiKey),
    })
  },

  getTransferStatusByTxHash: (
    apiHost,
    apiKey,
    txHash
  ) => {
    return request(`${apiHost}/payment-status/transaction/${txHash}`, {
      headers: defineHeaders(apiKey),
    })
  },

  getFee: (
    apiHost,
    apiKey,
    amount,
    tokenAddress,
    sender,
    tokenType,
    transferId,
    expiration
  ) => {
    const queryVariables = createQueryString({
      amount,
      token_address: tokenAddress,
      sender,
      token_type: tokenType,
      transfer_id: transferId,
      expiration
    })
    return request(`${apiHost}/fee?${queryVariables}`, {
      headers: defineHeaders(apiKey),
    })
  },

  getHistory: (
    apiHost,
    apiKey,
    sender,
    onlyActive,
    offset,
    limit,
    token
  ) => {
    const queryVariables = createQueryString({
      only_active: onlyActive,
      offset,
      limit,
      token_address: token
    })
    return request(`${apiHost}/payment-status/sender/${sender}/get-sender-history?${queryVariables}`, {
      headers: defineHeaders(apiKey),
    })
  },

  getLimits: (
    apiHost,
    apiKey,
    tokenAddress,
    tokenType
  ) => {
    const queryVariables = createQueryString({
      token_address: tokenAddress,
      token_type: tokenType,
    })
    return request(`${apiHost}/limits?${queryVariables}`, {
      headers: defineHeaders(apiKey),
    })
  }
}

export default requests