const defineNetworkName = (chainId: number | null) : string => {
  switch (Number(chainId)) {
    case 1: return 'mainnet'
    case 137: return 'matic'
    case 8453: return 'base'
    case 13371: return 'immutable-zkevm'
    case 196: return 'xlayer'
    default: return 'mainnet'
  }
}

export default defineNetworkName