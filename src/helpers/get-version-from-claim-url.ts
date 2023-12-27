import { parseQueryParams } from '.'
import { errors } from '../texts'

const getVersionFromClaimUrl = (claimUrl: string) => {
  const hashIndex = claimUrl.indexOf('#');
  const paramsString = claimUrl.substring(hashIndex + 1).split('?')[1]
  const parsedParams = parseQueryParams(paramsString)
  const version = parsedParams["v"]
  if (!version) {
    throw new Error(errors.version_not_provided())
  }

  return version
}

export default getVersionFromClaimUrl