import {
  ETokenAddress, TDomain
} from '../types'

type TDefineDomain = (
  chainId: number | null,
  tokenAddress: string
) => TDomain | null

const defineDomain: TDefineDomain = (
  chainId,
  tokenAddress
) => {
  if (chainId === 137) {
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
      "chainId": 137,
      "verifyingContract": ETokenAddress.usdcPolygon
    }
    
  }

  if (chainId === 84531) {// Base Goerli
    return {
      name: 'USD Coin',  
      version: '2',
      chainId: 84531,
      verifyingContract: ETokenAddress.usdcBaseGoerli
    }
  }

  if (chainId === 80001) { // Mumbai
    return {
      name: 'USD Coin (PoS)',
      version: '1',
      verifyingContract: ETokenAddress.usdcMumbai,
      salt: '0x0000000000000000000000000000000000000000000000000000000000013881'
    }
  } 

  if (chainId === 8453) { // Base
    return {
      name: 'USD Coin',
      version: '2',
      chainId: 8453,
      verifyingContract: ETokenAddress.usdcBase
    }
  }

  return null
}

export default defineDomain