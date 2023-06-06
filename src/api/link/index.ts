import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  redeemLink: (
    apiHost,
    receiver,
    sender,
    token,
    transferId,
    expiration,
    receiverSig,
    senderSig
  ) => {
    return axios.post(`${apiHost}/redeem`, {
      receiver,
      sender,
      token,
      transferId,
      expiration,
      receiverSig,
      senderSig
    })
  },
  deposit: (
    apiHost,
    from,
    token,
    to,
    amount,
    validAfter,
    validBefore,
    nonce,
    v,
    r,
    s
  ) => {
    return axios.post(`${apiHost}/deposit`, {
      from,
      token,
      to,
      amount,
      validAfter,
      validBefore,
      nonce,
      v,
      r,
      s
    })
  },
}

export default requests