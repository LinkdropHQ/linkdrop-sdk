import { ethers } from 'ethers'
import { linkApi } from '../api'
import { signReceiverAddress } from '../utils'

const redeemLink = async (
  linkKey: string,
  receiverAddress: string,
  apiHost: string,
  campaignSig: string,
) => {
  const wallet = new ethers.Wallet(linkKey)
  const receiverSignature = await signReceiverAddress(wallet, receiverAddress)
  const claimLink = await linkApi.redeemLink(
    apiHost,
    campaignSig,
    wallet.address,
    receiverAddress,
    receiverSignature
  )
  if (claimLink.data) {
    const { data } = claimLink.data
    return data
  }
}

export default redeemLink