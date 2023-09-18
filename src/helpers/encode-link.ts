import { ethers } from 'ethers'
import { TLink } from "../types"

type TEncodeLink = (claimHost: string, link: TLink) => string
const encodeLink: TEncodeLink = (claimHost, link) => {
  const linkKey = ethers.utils.base58.encode(link.linkKey)
  const sig = ethers.utils.base58.encode(link.senderSig)
  const transferId = ethers.utils.base58.encode(ethers.BigNumber.from(link.transferId).toHexString()) // string -> hex -> base58 for shorter string

  return `${claimHost}/#/usdc?k=${linkKey}&s=${sig}&i=${transferId}&c=${link.chainId}&v=1`
}

export default encodeLink
