import axios from 'axios'
import { TRequests } from './types'

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
    return axios.post(`${apiHost}/redeem`, {
      receiver,
      sender,
      escrow,
      transfer_id,
      receiver_sig,
      sender_sig
    }, {
      headers: {
        'authorization': `Bearer ${apiKey}`
      }
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
    return axios.post(`${apiHost}/deposit`, {
      sender,
      escrow,
      transfer_id,
      expiration,
      amount,
      authorization
    }, {
      headers: {
        'authorization': `Bearer ${apiKey}`
      }
    })
  },
  getTransferStatus: (
    apiHost,
    apiKey,
    sender,
    transferId
  ) => {
    
    return axios.get(`${apiHost}/payment-status/sender/${sender}/transfer/${transferId}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`
      }
    })
  },
  getTransferStatusByTxHash: (
    apiHost,
    apiKey,
    txHash
  ) => {
    return axios.get(`${apiHost}/payment-status/transaction/${txHash}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`
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
    return axios.get(`${apiHost}/fee?amount=${amount}&token_address=${tokenAddress}&sender=${sender}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`
      }
    })
  }
}

export default requests