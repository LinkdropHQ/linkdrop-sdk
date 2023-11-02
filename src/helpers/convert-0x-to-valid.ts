import { EChains } from '../types'

type TConvert0xyToValid = (
  value: string,
  validLength: number
) => string

const convert0xToValid: TConvert0xyToValid = (value, validLength) => {
  if (value.length === validLength) {
    return value
  }

  const missedZeros = validLength - value.length
  const stringToUseAsPrefix = new Array(missedZeros).fill(undefined).map(_ => 0).join('')
  return value.replace('0x', `0x${stringToUseAsPrefix}`)
}
export default convert0xToValid