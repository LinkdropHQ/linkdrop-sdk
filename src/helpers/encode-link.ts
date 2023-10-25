import { ethers } from 'ethers'
import { TLink } from "../types"

type TEncodeLink = (
  claimHost: string,
  link: TLink
) => string | void
const encodeLink: TEncodeLink = (claimHost, link) => {
  const linkKey = ethers.utils.base58.encode(link.linkKey)
  const transferId = ethers.utils.base58.encode(ethers.BigNumber.from(link.transferId).toHexString()) // string -> hex -> base58 for shorter string
  // version definition should be clarified 
  if (link.senderSig) {
    const sig = ethers.utils.base58.encode(link.senderSig)
    return `${claimHost}/#/usdc?k=${linkKey}&sg=${sig}&i=${transferId}&c=${link.chainId}&v=2`
  } else if (link.sender) {
    return `${claimHost}/#/usdc?k=${linkKey}&s=${link.sender}&i=${transferId}&c=${link.chainId}&v=2`
  }

}

export default encodeLink
