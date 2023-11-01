import { ethers } from 'ethers'
import { TLink, TTokenType } from "../types"
import { defineTokenSymbol } from '../helpers'

type TEncodeLink = (
  claimHost: string,
  link: TLink
) => string | void
const encodeLink: TEncodeLink = (claimHost, link) => {

  const linkKey = ethers.utils.base58.encode(link.linkKey)
  const transferId = ethers.utils.base58.encode(link.transferId) // string -> hex -> base58 for shorter string
  const symbol = defineTokenSymbol(
    link.tokenType as TTokenType,
    link.chainId
  )

  if (link.senderSig) {
    const sig = ethers.utils.base58.encode(link.senderSig)
    return `${claimHost}/#/${symbol}?k=${linkKey}&sg=${sig}&i=${transferId}&c=${link.chainId}&v=2`
  } else if (link.sender) {
    return `${claimHost}/#/${symbol}?k=${linkKey}&s=${link.sender}&i=${transferId}&c=${link.chainId}&v=2`
  }
}

export default encodeLink
