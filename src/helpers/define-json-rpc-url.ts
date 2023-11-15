import { defineNetworkName } from './'
import {
  polygonJSONRPCUrl,
  mumbaiJSONRPCUrl,
  baseJSONRPCUrl,
  baseGoerliJSONRPCUrl
} from '../configs'

const defineJSONRpcUrl = ({ chainId } : { chainId: number }) => {
  const networkName = defineNetworkName(chainId)

  if (networkName === 'polygon') {
    return polygonJSONRPCUrl
  } else if (networkName === 'mumbai') {
    return mumbaiJSONRPCUrl
  } else if (networkName === 'base') {
    return baseJSONRPCUrl
  } else if (networkName === 'baseGoeli') {
    return baseGoerliJSONRPCUrl
  }
  
  return alert('Current chain id is not supported')
}

export default defineJSONRpcUrl