type TGenerateAccount = (
  shortCodeLength: number,
  shortCodeMixRegister: boolean
) => {
  privateKey: string
  address: string
  shortCode: string
}

export default TGenerateAccount