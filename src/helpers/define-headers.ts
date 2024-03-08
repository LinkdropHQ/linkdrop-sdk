const defineHeaders = (apiKey: string | null) => {
  const headers = {
    'content-type': 'application/json'
  }

  if (apiKey) {
    headers['authorization'] = `Bearer ${apiKey}`
  }

  return headers
}

export default defineHeaders
