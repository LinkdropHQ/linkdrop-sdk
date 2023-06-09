


async function generateReceiverSig(linkKey, receiver) {
  const wallet = new ethers.Wallet(linkKey)
  const messageHash = ethers.utils.solidityKeccak256(
    ['address'],
    [receiver]
  )
  const messageHashToSign = ethers.utils.arrayify(messageHash)
  const signature = await wallet.signMessage(messageHashToSign)
  return signature
}


module.exports = {
  generateLinkKeyandSignature,
  generateReceiverSig
}
