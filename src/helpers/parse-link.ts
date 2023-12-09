import decodeLink from "./decode-link"
import { ethers } from "ethers"

type TParseLink = (
  link: string
) => {
  senderSig?: string,
  linkKey: string
}

const parseLink: TParseLink = (
  link
) => {
  const decodedLink = decodeLink(link)

  return {
    senderSig: decodedLink.senderSig,
    linkKey: decodedLink.linkKey
  }
}

export default parseLink
