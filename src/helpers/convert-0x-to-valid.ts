import { EChains } from '../types'

type TConvert0xyToValid = (
  value: string,
  validLength: number
) => string

const convert0xToValid: TConvert0xyToValid = (value, validLength) => {
  if (value.length === validLength) {
    return value
  }

  return value.replace('0x', '0x0')
}
export default convert0xToValid