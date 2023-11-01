import { ethers, encodeBase58 } from 'ethers'
import { TLink } from "../types"

type TEncodeLink = (claimHost: string, link: TLink) => string
const encodeLink: TEncodeLink = (claimHost, link) => {
  const linkKey = encodeBase58(link.linkKey)
  const sig = encodeBase58(link.senderSig)
  const transferId = encodeBase58(ethers.toBeHex(BigInt(link.transferId))) // string -> hex -> base58 forshorter string
  return `${claimHost}/#/usdc?k=${linkKey}&s=${sig}&i=${transferId}&c=${link.chainId}&v=1`
}

export default encodeLink
