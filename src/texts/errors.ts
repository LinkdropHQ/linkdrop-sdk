import { EChains } from '../types'

export default {
  'chain_not_supported': () => `Chain is not supported. Please use ${Object.keys(EChains).filter(item => isNaN(Number(item))).join(', ')}`,
  'argument_not_provided': (argumentName: string) => `Argument "${argumentName}" is not provided`,
  'property_not_provided': (propertyName: string) => `Property "${propertyName}" is not provided`,
  'cannot_update_amount': () => `Cannot update amount after deposit`,
  'deploy_with_auth_wrong_type': () => `You can use 'depositWithAuthorization' method only for ERC20 tokens. Use 'deposit' method instead`,
  'not_possible_create_claim_url': () => `Link should have senderSig or sender to be created`,
  'link_decode_failed': () => `Link should have 'sg' (signature) or 's' (sender) param to be decoded`,
  'link_parse_failed': () => `Link should have 'sg' (signature) or 's' (sender) param to be parsed`,
  'variable_cannot_be_defined': (variable: string) => `${variable} cannot be defined`,
  'limits_not_defined': () => `Limits were not defined. Cannot create link`,
  'amount_should_be_more_than_minlimit': (minLimit: string) => `Amount should be greater than or equal to ${minLimit}`,
  'amount_should_be_less_than_maxlimit': (maxLimit: string) => `Max amount ${maxLimit}`,
  'escrow_not_available': (tokenAddress: string, chainId: number) => `Escrow contract is not available for token ${tokenAddress} (chain id: ${chainId})`,
  'escrow_is_not_correct': () => `Escrow contract address is not correct. Please check chainId and token address`,
  'version_not_found': () => 'Version not found for the provided escrow contract address',
  'version_not_provided': () => 'Version parameter "v" not found in URL',
  'link_only_for_claim': () => 'This link can only be redeemed',
  'only_original_sender_can_generate_url': () => 'Only original sender can generate new url'
}