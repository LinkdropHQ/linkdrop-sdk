import { ethers } from "ethers"
import { TGetRandomBytes } from "../../types"

const generateKeypair = async (
  getRandomBytes: TGetRandomBytes
) => {
  const mnemonic = ethers.Mnemonic.fromEntropy(await getRandomBytes(32))
  const linkKey = ethers.Wallet.fromPhrase(mnemonic.phrase)
  return linkKey
}

export default generateKeypair