import { ethers } from "ethers"
import { TGetRandomBytes } from "../../types"

const generateKeypair = async (
  getRandomBytes: TGetRandomBytes
) => {
  const linkKey = new ethers.Wallet(await getRandomBytes(32))
  return linkKey
}

export default generateKeypair