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
    transfer_id
  ) => {
    return axios.get(`${apiHost}/get-payment-status/${sender}/${transfer_id}`, {
      headers: {
        'authorization': `Bearer ${apiKey}`
      }
    })
  }
}

export default requests