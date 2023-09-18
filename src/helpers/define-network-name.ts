const defineNetworkName = (chainId: number | null) : string => {
  switch (Number(chainId)) {
    case 137: return 'matic'
    case 8453: return 'base'
    case 80001: return 'mumbai'
    default: return 'mainnet'
  }
}

export default defineNetworkName