class ForbiddenError extends Error {
  code: number
  error?: string

  constructor (
    message: string,
    error?: string
  ) {
    super(`Forbidden Error: ${message}`)
    this.code = 403
    this.error = error
  }
}

export default ForbiddenError
