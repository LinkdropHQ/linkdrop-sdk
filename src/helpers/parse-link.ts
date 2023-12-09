import decodeLink from "./decode-link"
import { ethers } from "ethers"

type TParseLink = (
  link: string
) => {
  senderSig?: string,
  linkKey: string,
  transferId: string,
}

const parseLink: TParseLink = (
  link
) => {
  const decodedLink = decodeLink(link)
  const linkKeyId = (new ethers.Wallet(decodedLink.linkKey)).address.toLowerCase()

  return {
    senderSig: decodedLink.senderSig,
    linkKey: decodedLink.linkKey,
    transferId: linkKeyId
  }
}

export default parseLink
