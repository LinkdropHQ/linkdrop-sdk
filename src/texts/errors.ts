import { EChains } from '../types'

export default {
  'chain_not_supported': () => `Chain is not supported. Please use ${Object.keys(EChains).filter(item => isNaN(Number(item))).join(', ')}`,
  'argument_not_provided': (argumentName: string) => `Argument ${argumentName} is not provided`,
  'property_not_provided': (propertyName: string) => `Property ${propertyName} is not provided`,
  'cannot_update_amount': () => `Cannot update amount after deposit`,
  'deploy_with_auth_wrong_type': () => `You can use 'deployWithAuthorization' method only for ERC20 tokens. Use 'deploy' method instead`,
  'not_possible_create_claim_url': () => `Link should have senderSig or sender to be created`,
  'link_decode_failed': () => `Link should have 'sg' (signature) or 's' (sender) param to be decoded`,
  'link_parse_failed': () => `Link should have 'sg' (signature) or 's' (sender) param to be parsed`,
  'token_type_cannot_be_defined': () => `Token type cannot be defined`,
}