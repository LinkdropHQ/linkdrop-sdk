type TCheckApiKeyFormatValidity = (apiKey?: string) => boolean

const checkApiKeyFormatValidity: TCheckApiKeyFormatValidity = (apiKey) => {
  return Boolean(apiKey)
}

export default checkApiKeyFormatValidity