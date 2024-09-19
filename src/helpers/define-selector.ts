import { TAuthorizationMethod, ESelectors } from "../types"

const defineSelector = (authorizationMethod: TAuthorizationMethod) => {
  if (authorizationMethod === 'ApproveWithAuthorization') {
    return ESelectors.approveWithAuthorization
  }

  return ESelectors.receiveWithAuthorization
}

export default defineSelector