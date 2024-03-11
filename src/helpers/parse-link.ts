import decodeLink from "./decode-link"
import { TLink } from "../types"

type TParseLink = (
  link: string,
  decodedLink?: TLink
) => {
  senderSig?: string,
  linkKey: string
}

const parseLink: TParseLink = (
  link,
  decodedLink
) => {
  if (!decodedLink) {
    decodedLink = decodeLink(link)
  }

  return {
    senderSig: decodedLink.senderSig,
    linkKey: decodedLink.linkKey
  }
}

export default parseLink
