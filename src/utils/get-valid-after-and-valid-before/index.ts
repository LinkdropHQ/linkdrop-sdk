const getValidAfterAndValidBefore = () => {
  const now = Math.floor(Date.now() / 1000)
  const validAfter = now - 60 * 60 // valid 1 hour ago                                                                                                                                                      
  const validBefore = now + 60 * 60 * 24 // valid for the next 24 hours                                                                                                                                     
  return [validAfter, validBefore]
}

export default getValidAfterAndValidBefore