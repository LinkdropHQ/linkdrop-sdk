type TCreateQueryString = (obj: Record<string, string | number | boolean | undefined>) => string


const createQueryString: TCreateQueryString = (obj) => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (!value) {
      return result
    }
    if (result === '') {
      return `${key}=${value}` 
    }
    return `${result}&${key}=${value}` 
  }, '')
}

export default createQueryString
