import { ETokenSymbol, TLink } from '../types'
import { defineTokenType, parseQueryParams } from '.'
import { ethers, decodeBase58 } from 'ethers'
type TDecodeLink = (link: string) => TLink

const decodeLink: TDecodeLink = (link) => {
  // Use URLSearchParams to get query parameters
  const hashIndex = link.indexOf('#');
  //if (hashIndex === -1) return null;
  const paramsString = link.substring(hashIndex + 1).split('?')[1]
  const parsedParams = parseQueryParams(paramsString)

  const params = {
    linkKey: parsedParams["k"] || "",
    signature: parsedParams["sg"],
    transferId: parsedParams["i"] || "",
    chainId: parsedParams["c"],
    version: parsedParams["v"] || "1",
    sender: parsedParams["s"] || ''
  }

  const linkKey = ethers.toBeHex(decodeBase58(params.linkKey), 32)
  const senderSig = params.signature ? ethers.toBeHex(decodeBase58(params.signature), 65) : undefined
  const sender = params.sender ? ethers.toBeHex(decodeBase58(params.sender), 20) : undefined
  const transferId = params.transferId ? ethers.toBeHex(decodeBase58(params.transferId), 20) : (new ethers.Wallet(linkKey)).address.toLowerCase()

  const chainId = Number(params.chainId)

  return {
    senderSig,
    linkKey,
    transferId,
    chainId,
    sender,
    version: params.version
  }
}

export default decodeLink
