import { ethers } from "ethers"
import { TGetRandomBytes } from "../../types"

const generateKeypair = async (
  getRandomBytes: TGetRandomBytes
) => {
  ethers.randomBytes.register(getRandomBytes)
  const linkKey = ethers.Wallet.createRandom()
  return linkKey
}

export default generateKeypair