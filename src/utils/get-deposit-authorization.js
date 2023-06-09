//const ethers = require('ethers');
const { ethers } = require('ethers');

// Generate a random string and convert it to bytes32
function getNonce(from, transferId, amount, expiration) {
  return ethers.utils.solidityKeccak256(
    ['address', 'uint256', 'uint256', 'uint128'],
    [from, transferId, amount, expiration ]
  )
}

function getValidAfterAndValidBefore() {
   const now = Math.floor(Date.now() / 1000);
   const validAfter = now - 60 * 60; // valid 1 hour ago                                                                                                                                                      
   const validBefore = now + 60 * 60 * 24; // valid for the next 24 hours                                                                                                                                     
   return [validAfter, validBefore];   
 }


// // The EIP-712 data
// const domain = {
//     name: 'USDC Coin',
//     version: '2',
//     chainId: 1, // Replace with the chain ID of the network you are on
//     verifyingContract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Replace with the USDC contract address
// };
async function getAuthorization(user, to, amount, validAfter, validBefore, transferId, expiration, domain) {
  console.log({ user, to, amount, validAfter, validBefore, transferId, expiration, domain })
    // The EIP-712 type data
    const types = {
        TransferWithAuthorization: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'validAfter', type: 'uint256' },
            { name: 'validBefore', type: 'uint256' },
            { name: 'nonce', type: 'bytes32' },
        ],
    };
  const nonce = getNonce(user.address, transferId, amount, expiration)
  console.log({ nonce })
  const message = {
    from: user.address,
    to,
    value: amount,
    validAfter,
    validBefore,
    nonce    
  }
  
  const signature = await user._signTypedData(domain, types, message);
  const signatureSplit = ethers.utils.splitSignature(signature);

  
    // Encode the authorization
    const authorization = ethers.utils.defaultAbiCoder.encode(
        ['address', 'address', 'uint256', 'uint256', 'uint256', 'bytes32', 'uint8', 'bytes32', 'bytes32'],
        [message.from, message.to, message.value, message.validAfter, message.validBefore, message.nonce, signatureSplit.v, signatureSplit.r, signatureSplit.s]
    );
  
    return authorization;
}

module.exports = {
  getAuthorization,
  getValidAfterAndValidBefore
}
