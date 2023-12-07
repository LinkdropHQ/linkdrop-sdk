import { ethers, encodeBase58 } from 'ethers'
import { TLink, TTokenType } from "../types"
import { defineTokenSymbol } from '.'

type TEncodeLink = (
  claimHost: string,
  link: TLink,
  tokenAddress: string
) => string | void

const encodeLink: TEncodeLink = (
  claimHost,
  link,
  tokenAddress
) => {

  const linkKey = encodeBase58(link.linkKey)
  const transferId = encodeBase58(link.transferId) // string -> hex -> base58 for shorter string

  if (link.senderSig) {
    const sig = encodeBase58(link.senderSig)
    return `${claimHost}/#/code?k=${linkKey}&sg=${sig}&i=${transferId}&c=${link.chainId}&v=3`
  } else if (link.sender) {
    const sender = encodeBase58(link.sender)
    return `${claimHost}/#/code?k=${linkKey}&s=${sender}&c=${link.chainId}&v=3`
  }
}

export default encodeLink
