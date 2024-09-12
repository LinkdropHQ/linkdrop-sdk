import { EChains, ETokenAddress } from "../types"

const baseEURC = {
  name: 'Coinbase Wrapped BTC',
  version: '2',
  chainId: EChains.base,
  verifyingContract: ETokenAddress.cbBTC
}

export default baseEURC