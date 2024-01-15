function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error(String(res.status))
    })
    .then((data) => data as TResponse)
}

export default request