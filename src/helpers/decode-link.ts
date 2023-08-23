import { TLink } from "../types"
import { BigNumber, utils } from 'ethers'
type TDecodeLink = (link: string) => TLink

const decodeLink: TDecodeLink = (link) => {
  // Use URLSearchParams to get query parameters
  const currentURL = new URL(link);
  const url = currentURL.hash.split("?")[1]
  const searchParams = new URLSearchParams(url);
  const params = {
    linkKey: searchParams.get("k") || "",
    s: searchParams.get("s") || "",
    transferId: searchParams.get("i") || "",
    chainId: searchParams.get("c"),
  };

  const linkKey = utils.hexlify(utils.base58.decode(params.linkKey))
  const senderSig = utils.hexlify(utils.base58.decode(params.s))
  const transferId = BigNumber.from(utils.base58.decode(params.transferId)).toString()
  const chainId = Number(params.chainId)

  return {
    senderSig,
    linkKey,
    transferId,
    chainId
  }
}

export default decodeLink
