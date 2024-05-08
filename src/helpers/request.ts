import { ConflictError, ValidationError, ForbiddenError } from '../errors'
import defineErrorText from './define-error-text'

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
) {
  try {
    const res = await fetch(url, config)
    if (res.ok) {
      return res.json()
    }
    const responseData = await res.json()
    const responseCode = res.status
    const responseMessage = (responseData.message as string) || 'Some error occured. Please check server response for more info'
    const responseErrors = responseData.errors as string[]
    const responseErrorText = responseErrors && responseErrors.length ? responseErrors[0] : defineErrorText(res)
    switch (responseCode) {
      case 409:
        throw new ConflictError(responseMessage, responseErrorText)
      case 400:
        throw new ValidationError(responseMessage, responseErrorText)
      case 403:
        throw new ForbiddenError(responseMessage, responseErrorText)
      default:
        throw new Error(responseMessage)
    }
  } catch (err) {
    throw err
  }
}

export default request