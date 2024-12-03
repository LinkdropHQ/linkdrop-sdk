class NotFoundError extends Error {
  code: number
  error?: string

  constructor (
    message: string,
    error?: string
  ) {
    super(`Not Found Error: ${message}`)
    this.code = 404
    this.error = error
  }
}

export default NotFoundError
