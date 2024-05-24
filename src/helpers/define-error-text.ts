type TDefineErrorText = (
  status: number,
  error: {
  message?: string,
  geographicContext?: {
    asn: string,
    country: string,
    regionCode: string
  }
}) => string

const defineErrorText: TDefineErrorText = (
  status,
  error
) => {
  switch (status) {
    case 403:
      if (error.message) {
        return error.message
      }

      if (error.geographicContext) {
        return 'Service is not available in this region'
      }

      return 'Some error occured. Please check server response for more info'
    default:
      if (error.message) {
        return error.message
      }
      return 'Some error occured. Please check server response for more info'

  }
}

export default defineErrorText