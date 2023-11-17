class ValidationError extends Error {
  code: number
  constructor (message: string) {
    super(`Validation Error: ${message}`)
    this.code = 400
  }
}

export default ValidationError
