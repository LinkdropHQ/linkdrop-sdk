import { ETokenSymbol, TLink } from '../types'
import { defineTokenType, convert0xValid } from './'
import { ethers, decodeBase58 } from 'ethers'
type TDecodeLink = (link: string) => TLink

function parseQuery(queryString) {
  const pairs = queryString.split('&');
  const result = {};
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    result[key] = decodeURIComponent(value || '');
  });
  return result;
}

const decodeLink: TDecodeLink = (link) => {
  // Use URLSearchParams to get query parameters
  const hashIndex = link.indexOf('#');
  //if (hashIndex === -1) return null;
  const paramsString = link.substring(hashIndex + 1).split('?')[1]
  const parsedParams = parseQuery(paramsString)

  const tokenSymbol = (link.split('#/')[1]).split('?')[0] as ETokenSymbol
  const tokenType = defineTokenType(tokenSymbol)

  const params = {
    linkKey: parsedParams["k"] || "",
    signature: parsedParams["sg"],
    transferId: parsedParams["i"] || "",
    chainId: parsedParams["c"],
    version: parsedParams["v"] || "1",
    sender: parsedParams["s"] || ''
  }

  const linkKey = convert0xValid(ethers.toQuantity(decodeBase58(params.linkKey)), 66)
  const senderSig = params.signature ? convert0xValid(ethers.toQuantity(decodeBase58(params.signature)), 132) : undefined
  const sender = params.sender ? convert0xValid(ethers.toQuantity(decodeBase58(params.sender)), 42) : undefined
  const transferId = params.transferId ? convert0xValid(ethers.toQuantity(decodeBase58(params.transferId)), 42) : (new ethers.Wallet(linkKey)).address.toLowerCase()

  const chainId = Number(params.chainId)

  return {
    senderSig,
    linkKey,
    transferId,
    chainId,
    sender,
    version: params.version,
    tokenType
  }
}

export default decodeLink
