import { defineNetworkName } from './'
import {
  polygonJSONRPCUrl,
  mumbaiJSONRPCUrl,
  goerliJSONRPCUrl,
  mainnetJSONRPCUrl
} from '../configs'

const defineJSONRpcUrl = ({ chainId } : { chainId: number }) => {
  const networkName = defineNetworkName(chainId)

  if (networkName === 'matic') {
    return polygonJSONRPCUrl
  } else if (networkName === 'mumbai') {
    return mumbaiJSONRPCUrl
  } else if (networkName === 'goerli') {
    return goerliJSONRPCUrl
  } else if (networkName === 'mainnet') {
    return mainnetJSONRPCUrl
  }
  
  return alert('Current chain id is not supported')
}

export default defineJSONRpcUrl