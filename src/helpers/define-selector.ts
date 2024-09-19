import { EAuthorizationMethod, ESelectors } from "../types"

const defineSelector = (authorizationMethod: EAuthorizationMethod) => {
  if (authorizationMethod === EAuthorizationMethod.ApproveWithAuthorization) {
    return ESelectors.approveWithAuthorization
  }

  return ESelectors.receiveWithAuthorization
}

export default defineSelector
