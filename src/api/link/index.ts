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
  redeemLink: (
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
  deposit: (
    apiHost,
    apiKey,
    sender,
    escrow,
    transfer_id,
    expiration,
    amount,
    authorization
  ) => {
    console.log("making deposit request")
    const body = JSON.stringify({
      sender,
      escrow,
      transfer_id,
      expiration,
      amount,
      authorization
    })
    const url = `${apiHost}/deposit`
    const headers = {
      'authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }
    console.log({ apiHost, headers, body, url })
    return request(url, {
      headers,
      method: 'POST',
      body
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
