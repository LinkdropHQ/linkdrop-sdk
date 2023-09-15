import { defineNetworkName } from './'
import {
  polygonJSONRPCUrl,
  mumbaiJSONRPCUrl,
  baseJSONRPCUrl
} from '../configs'

const defineJSONRpcUrl = ({ chainId } : { chainId: number }) => {
  const networkName = defineNetworkName(chainId)

  if (networkName === 'matic') {
    return polygonJSONRPCUrl
  } else if (networkName === 'mumbai') {
    return mumbaiJSONRPCUrl
  }  else if (networkName === 'base') {
    return baseJSONRPCUrl
  }
  
  return alert('Current chain id is not supported')
}

export default defineJSONRpcUrl