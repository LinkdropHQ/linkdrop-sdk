import { ethers, encodeBase58 } from 'ethers'
import { TLink, TTokenType } from "../types"
import { defineTokenSymbol } from '../helpers'

type TEncodeLink = (
  claimHost: string,
  link: TLink
) => string | void
const encodeLink: TEncodeLink = (claimHost, link) => {

  const linkKey = encodeBase58(link.linkKey)
  const transferId = encodeBase58(link.transferId) // string -> hex -> base58 for shorter string
  const symbol = defineTokenSymbol(
    link.tokenType as TTokenType,
    link.chainId
  )

  if (link.senderSig) {
    const sig = encodeBase58(link.senderSig)
    return `${claimHost}/#/${symbol}?k=${linkKey}&sg=${sig}&i=${transferId}&c=${link.chainId}&v=2`
  } else if (link.sender) {
    const sender = encodeBase58(link.sender)
    return `${claimHost}/#/${symbol}?k=${linkKey}&s=${sender}&c=${link.chainId}&v=2`
  }
}

export default encodeLink
