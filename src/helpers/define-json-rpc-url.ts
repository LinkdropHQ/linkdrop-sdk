import { defineNetworkName } from './'
import {
  polygonJSONRPCUrl,
  mainnetJSONRPCUrl,
  baseJSONRPCUrl,
  immutableZkevmJSONRPCUrl,
  xlayerJSONRPCUrl
} from '../configs'

const defineJSONRpcUrl = ({ chainId } : { chainId: number }) => {
  const networkName = defineNetworkName(chainId)
  switch (networkName) {
    case 'matic':
      return polygonJSONRPCUrl
    case 'mainnet':
      return mainnetJSONRPCUrl
    case 'base':
      return baseJSONRPCUrl
    case 'immutableZkevm':
      return immutableZkevmJSONRPCUrl
    case 'xlayer':
      return xlayerJSONRPCUrl
    default:
      return alert('Current chain id is not supported')
  }
}

export default defineJSONRpcUrl