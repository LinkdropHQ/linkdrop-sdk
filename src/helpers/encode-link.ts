import { ethers, encodeBase58 } from 'ethers'
import { TLink } from "../types"

type TEncodeLink = (claimHost: string, link: TLink) => string
const encodeLink: TEncodeLink = (claimHost, link) => {
  console.log("encoding link")
  console.log(link)
  const linkKey = encodeBase58(link.linkKey)
  console.log({ linkKey })
  const sig = encodeBase58(link.senderSig)
  console.log({ sig })
  const transferId = encodeBase58(ethers.toBeHex(BigInt(link.transferId))) // string -> hex -> base58 forshorter string
  console.log({ transferId })
  return `${claimHost}/#/usdc?k=${linkKey}&s=${sig}&i=${transferId}&c=${link.chainId}&v=1`
}

export default encodeLink
