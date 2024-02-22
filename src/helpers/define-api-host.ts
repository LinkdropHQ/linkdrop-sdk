import { EChains } from '../types'
import * as configs from '../configs'

type TDefineApiHost = (
  chainId: number | null,
  apiHost: string | null
) => string | null

const defineApiHost: TDefineApiHost = (
  chainId,
  apiHost
) => {
  const apiHostActual = apiHost || configs.apiUrl
  switch (Number(chainId)) {
    case EChains.polygon: return `${apiHostActual}/polygon`
    case EChains.base: return `${apiHostActual}/base`
    case EChains.mumbai: return `${apiHostActual}/mumbai`
    case EChains.baseGoerli: return `${apiHostActual}/base-goerli`
    case EChains.arbitrum: return `${apiHostActual}/arbitrum`
    case EChains.optimism: return `${apiHostActual}/optimism`
    case EChains.avalanche: return `${apiHostActual}/avalanche`
    case EChains.gnosis: return `${apiHostActual}/gnosis`

    default:
      return null
  }
}

export default defineApiHost