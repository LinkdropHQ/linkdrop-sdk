import { TLink } from "../types"

type TDecodeLink = (link: string) => TLink
const decodeLink: TDecodeLink = (link) => {
  const encodedLinkParams = link.split('?linkParams=')[1]
  const linkParams = JSON.parse(atob(decodeURIComponent(encodedLinkParams)))
  return linkParams
}

export default decodeLink
