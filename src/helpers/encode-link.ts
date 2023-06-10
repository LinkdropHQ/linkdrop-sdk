import { TLink } from "../types"

type TEncodeLink = (claimHost: string, link: TLink) => string
const encodeLink: TEncodeLink = (claimHost, link) => {
  const linkParams = encodeURIComponent(btoa(JSON.stringify(link)))
  return `${claimHost}/#/redeem?linkParams=${linkParams}`
}

export default encodeLink
