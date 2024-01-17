import decodeLink from "./decode-link"
import { decodeSenderAddress } from "../utils"
import { ethers } from "ethers"
import { TEscrowPaymentDomain, TLink } from "../types"

type TParseLink = (
  chainId: number,
  escrowAddress: string,
  link: string,
  decodedLink?: TLink
) => Promise<{
  senderSig?: string,
  linkKey: string,
  transferId: string,
  sender: string
} | void>

const parseLink: TParseLink = async (
  chainId,
  escrowAddress,
  link,
  decodedLink
) => {

  if (!decodedLink) {
    decodedLink = decodeLink(link)
  }

  const linkKeyId = (new ethers.Wallet(decodedLink.linkKey)).address.toLowerCase()

  const escrowPaymentDomain: TEscrowPaymentDomain = {
    name: "LinkdropEscrow",
    version: "2",
    chainId: chainId,
    verifyingContract: escrowAddress,
  }

  if (decodedLink.sender) {
    return {
      senderSig: decodedLink.senderSig,
      linkKey: decodedLink.linkKey,
      transferId: linkKeyId,
      sender: decodedLink.sender,
      chainId
    }
  } else if (decodedLink.senderSig) {
    const sender = decodeSenderAddress(
      linkKeyId,
      decodedLink.transferId,
      decodedLink.senderSig,
      escrowPaymentDomain
    )

    return {
      senderSig: decodedLink.senderSig,
      linkKey: decodedLink.linkKey,
      transferId: decodedLink.transferId,
      sender,
      chainId
    }
  }
}

export default parseLink
