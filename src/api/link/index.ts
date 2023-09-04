import axios from 'axios'
import { TRequests } from './types'

const requests: TRequests = {
  redeemLink: (
    apiHost,
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
    })
  },
  deposit: (
    apiHost,
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
    })
  },
  getTransferStatus: (
    apiHost,
    sender,
    transfer_id
  ) => {
    return axios.get(`${apiHost}/get-payment-status/${sender}/${transfer_id}`)
  }
}

export default requests