import { ETokenSymbol, TLink } from '../types'
import { defineTokenType } from './'
import { BigNumber, utils } from 'ethers'
type TDecodeLink = (link: string) => TLink

const decodeLink: TDecodeLink = (link) => {
  // Use URLSearchParams to get query parameters
  const currentURL = new URL(link);
  const urlSplit = currentURL.hash.split("?")
  const searchParams = new URLSearchParams(urlSplit[1])
  const tokenSymbol = (urlSplit[0].split('#/')[1]).replaceAll('/', '') as ETokenSymbol
  const tokenType = defineTokenType(tokenSymbol)
  const params = {
    linkKey: searchParams.get("k") || "",
    signature: searchParams.get("sg") || "",
    transferId: searchParams.get("i") || "",
    chainId: searchParams.get("c"),
    version: searchParams.get("v") || "1",
    sender: searchParams.get("s") || ''
  }

  const linkKey = utils.hexlify(utils.base58.decode(params.linkKey))
  const senderSig = utils.hexlify(utils.base58.decode(params.signature))
  const transferId = BigNumber.from(utils.base58.decode(params.transferId)).toString()
  const chainId = Number(params.chainId)

  return {
    senderSig,
    linkKey,
    transferId,
    chainId,
    sender: params.sender,
    version: params.version,
    tokenType
  }
}

export default decodeLink
