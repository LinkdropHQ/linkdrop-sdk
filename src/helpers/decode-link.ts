import { TLink } from "../types"
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
  const hashIndex = link.indexOf('#');
  //if (hashIndex === -1) return null;
  const paramsString = link.substring(hashIndex + 1).split('?')[1];
  const parsedParams = parseQuery(paramsString);

  const params = {
    linkKey: parsedParams["k"] || "",
    s: parsedParams["s"] || "",
    transferId: parsedParams["i"] || "",
    chainId: parsedParams["c"],
  };

  const linkKey = ethers.toQuantity(decodeBase58(params.linkKey))
  const senderSig = ethers.toQuantity(decodeBase58(params.s))
  const transferId = BigInt(decodeBase58(params.transferId)).toString()
  const chainId = Number(params.chainId)

  return {
    senderSig,
    linkKey,
    transferId,
    chainId
  }
}

export default decodeLink
