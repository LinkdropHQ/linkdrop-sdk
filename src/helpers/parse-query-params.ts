function parseQuery(queryString: string) {
  const pairs = (queryString.replace('?', '')).split('&')
  const result = {}
  pairs.forEach(pair => {
    const [key, value] = pair.split('=')
    result[key] = decodeURIComponent(value || '')
  })
  return result
}

export default parseQuery
