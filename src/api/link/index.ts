import { TRequests } from './types'
import { createQueryString, request, defineHeaders } from '../../helpers'
import deposit from './deposit'
import depositWithAuth from './deposit-with-authorization'
import depositERC721 from './deposit-erc721'
import depositERC1155 from './deposit-erc1155'

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

  depositWithAuthorization: depositWithAuth,
  deposit,
  depositERC721,
  depositERC1155,
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
    tokenAddress,
    sender,
    tokenType,
    transferId,
    expiration,
    amount,
    tokenId
  ) => {
    const queryVariables = createQueryString({
      amount,
      token_address: tokenAddress,
      sender,
      token_type: tokenType,
      transfer_id: transferId,
      expiration,
      token_id: tokenId
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