import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

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
    return axios.post(`${apiHost}/api/v1/escrow-payments/redeem`, {
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
    return axios.post(`${apiHost}/api/v1/escrow-payments/deposit`, {
      sender,
      escrow,
      transfer_id,
      expiration,
      amount,
      authorization
    })
  },
}

export default requests