const numberToHex = (num: number): string => {
  return num.toString(16).padStart(2, '0').toUpperCase()
}

export default numberToHex