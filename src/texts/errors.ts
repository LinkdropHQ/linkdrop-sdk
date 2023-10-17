import { EChains } from '../types'

export default {
  'chain_not_supported': () => `Chain is not supported. Please use ${Object.keys(EChains).filter(item => isNaN(Number(item))).join(', ')}`,
  'argument_not_provided': (argumentName: string) => `Argument ${argumentName} is not provided`,
  'property_not_provided': (propertyName: string) => `Property ${propertyName} is not provided`,
}