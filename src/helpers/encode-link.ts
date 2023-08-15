import { ethers } from 'ethers'
import { TLink } from "../types"

type TEncodeLink = (claimHost: string, link: TLink) => string
const encodeLink: TEncodeLink = (claimHost, link) => {
    const linkKey = ethers.utils.base58.encode(link.linkKey)
    const sig = ethers.utils.base58.encode(link.senderSig)
    const transferId = ethers.utils.base58.encode(ethers.BigNumber.from(link.transferId).toHexString()) // string -> hex -> base58 for shorter strng
    const k = [linkKey, sig, transferId].join("") // linkKey is always first 44 symbols, signature is the next 89 symbols and rest symbols are transferid
    return `${claimHost}/#/usdc?k=${k}&c=${link.chainId}`
}

export default encodeLink
