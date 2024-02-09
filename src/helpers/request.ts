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
    throw new Error(responseData.message || 'Some error occured. Please check server response for more info')
  } catch (err) {
    throw err
  }
}

export default request