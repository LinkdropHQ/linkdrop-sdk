import {
  ETokenAddress, TDomain, EChains
} from '../types'

type TDefineDomain = (
  chainId: number | null,
  tokenAddress: string
) => TDomain | null

const defineDomain: TDefineDomain = (
  chainId,
  tokenAddress
) => {
  if (chainId === EChains.polygon) {
    if (tokenAddress === ETokenAddress.usdcBridgedPolygon) {
      return {
        name: 'USD Coin (PoS)',  // Polygon Mainnet
        version: '1',
        verifyingContract: ETokenAddress.usdcBridgedPolygon,
        salt: '0x0000000000000000000000000000000000000000000000000000000000000089'
      }
    }

    return {
      "name": "USD Coin",
      "version": "2",
      "chainId": EChains.polygon,
      "verifyingContract": ETokenAddress.usdcPolygon
    }
    
  }


  if (chainId === EChains.avalanche) { // avalanche
    return {
      "name": "USD Coin",
      "version": "2",
      "chainId": EChains.avalanche,
      "verifyingContract": ETokenAddress.usdcAvalanche
    }
  }

  if (chainId === EChains.optimism) { // optimism
    return {
      "name": "USD Coin",
      "version": "2",
      "chainId": EChains.optimism,
      "verifyingContract": ETokenAddress.usdcOptimism
    }
  }

  if (chainId === EChains.arbitrum) { // arbitrum
    return {
      "name": "USD Coin",
      "version": "2",
      "chainId": EChains.arbitrum,
      "verifyingContract": ETokenAddress.usdcArbitrum
    }
  }

  if (chainId === EChains.baseGoerli) {// Base Goerli
    return {
      name: 'USD Coin',  
      version: '2',
      chainId: EChains.baseGoerli,
      verifyingContract: ETokenAddress.usdcBaseGoerli
    }
  }

  if (chainId === EChains.sepolia) { // Sepolia
    return {
      "name": "USD Coin",
      "version": "2",
      "chainId": EChains.polygon,
      "verifyingContract": ETokenAddress.usdcSepolia
    }
  } 

  if (chainId === EChains.base) { // Base
    return {
      name: 'USD Coin',
      version: '2',
      chainId: EChains.base,
      verifyingContract: ETokenAddress.usdcBase
    }
  }

  return null
}

export default defineDomain