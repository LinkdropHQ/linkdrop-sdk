const generateKeyPair = require('./generate-keypair').default
const ethers = require('ethers');


async function generateLinkKeyandSignature(sender, transferId, domain) { 
  // Generate a new private key
  const { privateKey } = generateKeyPair()
  const linkKey = new ethers.Wallet(privateKey)
  // Create the data to sign
  const types = {
    Transfer: [
      { name: 'linkKeyId', type: 'address' },
      { name: 'transferId', type: 'uint256' }
    ]
  }
  
  const message = {
    linkKeyId: linkKey.address,
    transferId: transferId
  }
    
  const senderSig = await sender._signTypedData(domain, types, message);
  return { linkKey: linkKey.privateKey, linkKeyId: linkKey.address, senderSig } 
}

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
