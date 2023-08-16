import { TLink } from "../types"
import { BigNumber, utils } from 'ethers'
type TDecodeLink = (link: string) => TLink
const decodeLink: TDecodeLink = (link) => {
    // get chain id
    let encodedLinkParamsC = link.split('&c=')[1]
    const chainId = Number(encodedLinkParamsC.split("&")[0])

    // get & decode link key, sender signature and transfer id
    let encodedLinkParams = link.split('?k=')[1]
    const k = encodedLinkParams.split("&")[0]
    const linkKey = utils.hexlify(utils.base58.decode(k.substring(0, 44))) // first 44 symbols is link key in base56 format
    const senderSig = utils.hexlify(utils.base58.decode(k.substring(44, 133)))  // the next 89 symbols is sender signature in base56 format
    const transferId = BigNumber.from(utils.base58.decode(k.substring(133))).toString() // the rest symbols represent transferId
    return {
        senderSig,
        linkKey,
        transferId,
        chainId
    }
}

export default decodeLink
