import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  getParams: (
    apiHost,
    linkId,
  ) => {
    return axios.get(`${apiHost}/api/v2/claim-links/${linkId}`)
  },
  getStatus: (
    apiHost,
    linkId
  ) => {
    return axios.get(`${apiHost}/api/v2/claim-links/${linkId}/status`)
  },
  deactivateLink: (
    apiHost,
    campaignSig,
    linkId
  ) => {
    const headers = defineRequestKeyHeader(campaignSig)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/claim-links/${linkId}/deactivate`, {}, {
      headers
    })
  },
  reactivateLink: (
    apiHost,
    campaignSig,
    linkId
  ) => {
    const headers = defineRequestKeyHeader(campaignSig)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/claim-links/${linkId}/reactivate`, {}, {
      headers
    })
  },
  redeemLink: (
    apiHost,
    linkId,
    receiverAddress,
    receiverSignature
  ) => {
    return axios.post(`${apiHost}/api/v2/claim-links/${linkId}/claim`, {
      receiver_address: receiverAddress,
      receiver_signature: receiverSignature
    })
  }
}

export default requests