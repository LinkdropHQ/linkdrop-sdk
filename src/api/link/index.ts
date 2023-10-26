import { TRequests } from './types'

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
    sender
  ) => {
    return request(`${apiHost}/fee?amount=${amount}&token_address=${tokenAddress}&sender=${sender}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json'
      }
    })
  }
}

export default requests