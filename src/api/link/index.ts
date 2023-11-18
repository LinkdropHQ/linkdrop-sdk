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

const requests: TRequests = {
  redeemRecoveredLink: (
    apiHost,
    apiKey,
    receiver,
    sender,
    escrow,
    transfer_id,
    receiver_sig,
    sender_sig
  ) => {
    return request(`${apiHost}/redeem-recovered`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        receiver,
        sender,
        escrow,
        transfer_id,
        receiver_sig,
        sender_sig
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
    receiver_sig
  ) => {
    return request(`${apiHost}/redeem`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        receiver,
        sender,
        escrow,
        transfer_id,
        receiver_sig
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
    amount,
    authorization
  ) => {
    return request(`${apiHost}/deposit-with-authorization`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        sender,
        token,
        token_type,
        escrow,
        transfer_id,
        expiration,
        amount,
        authorization
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
    amount,
    tx_hash
  ) => {
    return request(`${apiHost}/deposit`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        sender,
        escrow,
        transfer_id,
        token,
        token_type,
        expiration,
        amount,
        tx_hash
      })
    })
  },
  getTransferStatus: (
    apiHost,
    apiKey,
    sender,
    transferId
  ) => {
    return request(`${apiHost}/payment-status/sender/${sender}/transfer/${transferId}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      }
    })
  },
  getTransferStatusByTxHash: (
    apiHost,
    apiKey,
    txHash
  ) => {
    return request(`${apiHost}/payment-status/transaction/${txHash}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      }
    })
  },
  getFee: (
    apiHost,
    apiKey,
    amount,
    tokenAddress,
    sender,
    tokenType
  ) => {
    return request(`${apiHost}/fee?amount=${amount}&token_address=${tokenAddress}&sender=${sender}&token_type=${tokenType}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      }
    })
  },

  getHistory: (
    apiHost,
    apiKey,
    sender,
    onlyActive,
    offset,
    limit,
    tokenAddress
  ) => {
    const queryVariables = createQueryString({
      only_active: onlyActive,
      offset,
      limit,
      token_address: tokenAddress
    })
    return request(`${apiHost}/payment-status/sender/${sender}/get-sender-history?${queryVariables}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      }
    })
  },

  getLimits: (
    apiHost,
    apiKey,
    tokenAddress,
    tokenType
  ) => {
    return request(`${apiHost}/limits?token_address=${tokenAddress}&token_type=${tokenType}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      }
    })
  }
}

export default requests