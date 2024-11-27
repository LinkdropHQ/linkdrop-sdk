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
    // error.message
    const responseMessage = defineErrorText(res.status, responseData)
    // 
    const responseErrors = responseData.errors as string[]

    // error.error
    const responseErrorText = (responseErrors && responseErrors.length) ? responseErrors[0] : 'SERVER_ERROR'

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