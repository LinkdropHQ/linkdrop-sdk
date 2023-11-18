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
  const symbol = defineTokenSymbol(
    link.tokenType as TTokenType,
    link.chainId,
    tokenAddress
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
