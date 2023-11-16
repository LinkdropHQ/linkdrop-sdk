# Linkdrop P2P SDK (V2)
## Import and initialize SDK
```js
import { LinkdropP2P } from 'linkdrop-p2p-sdk'

// baseUrl is the host to be used to generate claim URLs
// const baseUrl = "https://p2p.linkdrop.io" 
const sdk = LinkdropP2P({ apiKey, baseUrl }) 
```
## Sender methods
### Creating claim link
**1. Initialize claim link object:**  
Learn more about the `claimLink` object in [the ClaimLink section](#claimlink-properties)
```js
const from = "0x2331bca1f2de4661ed88a30c99a7a9449aa84195" // Sender's Ethereum address
const token = "0x0fa8781a83e46826621b3bc094ea2a0212e71b23" // token contract address
const tokenType = "ERC20" // one of "NATIVE" | "ERC20" 
const chainId = 80001 // network chain ID
const amount = "1000000" // atomic amount of tokens that sender wants to send (before fees)
const expiration = "1695985897077" // unix timestamp after which the claim link will expire and amount will be sent back to sender unless it was claimed before. Optional param, it not passed, it's going to be set to 15 days from now, 

const claimLink = await sdk.createClaimLink({ from, token, amount, expiration, chainId, tokenType })
const { amount, fee, totalAmount } = await claimLink.updateAmount(amount)
```
Methods `createClaimLink` and `updateAmount` will throw an error if amount is not valid according to limits.
To define the minimum and maximum limit of amount that can be sent via link, use the getLimits method
```js

const token = "0x0fa8781a83e46826621b3bc094ea2a0212e71b23" // token contract address. Not required if tokenType is NATIVE
const tokenType = "ERC20" // one of "NATIVE" | "ERC20" 
const chainId = 80001 // network chain ID

const { minTransferAmount, maxTransferAmount } = await sdk.getLimits({
  token,
  tokenType,
  chainId
})

```

**2a. Deposit tokens to escrow contract via EIP-3009 (transferWithAuthorization) :**  
To avoid asking for sender private key directly, we ask to pass a function that generates a EIP712 signature using Sender's private key. The function should be similar to ethers `signer.signTypedData` - https://docs.ethers.org/v6/api/providers/#Signer-signTypedData
```js
const signTypedData = (domain, types, message) => signer.signTypedData(domain, types, message)
```
To avoid using and linking native crypto libraries, we ask to pass a random bytes generation function:
```js
const getRandomBytes = (length) => { 
  return new Uint8Array(crypto.randomBytes(length));
}
const { claimUrl, transferId, txHash } = await claimLink.depositWithAuthorization({ signTypedData, getRandomBytes }) 
```
**2a. Deposit native tokens (ETH/MATIC) to escrow contract via direct call :**  
To avoid asking for sender private key directly, we ask to pass a function that signs and sends Ethereum transaction. The function should be similar to ethers `signer.sendTransaction` - https://docs.ethers.org/v6/api/providers/#Signer-signTypedData
```js
const sendTransaction = async ({ to, value, gasLimit, data }) => { 
  const tx = await signer.sendTransaction({ to, value, gasLimit, data })
  return { hash: tx.hash }
}
const { claimUrl, transferId, txHash } = await claimLink.deposit({ sendTransaction, getRandomBytes }) 
```
**3. Re-generate Claim URL:**  
Sender can generate a new claim URL (if the original claim URL is lost):
```js
const { claimUrl, transferId } = await claimLink.generateClaimUrl({ signTypedData, getRandomBytes })
// share claimUrl with receiver
```
### Retrieving claim link details
This methods help to retrieve claim link details by using deposit transaction hash (or sender & transferId). 

As claim URL is never stored in database, it will be `null` on retrieval and new claim URL can be generated with `claimLink.generateClaimUrl` method call. 
```js
// fetch claim link using deposit transaction hash
const claimLink = await sdk.retrieveClaimLink({ chainId, txHash }) 

// or by using sender + transferId
const claimLink = await sdk.retrieveClaimLink({ chainId, sender, transferId }) 
```

You can also fetch information about all created links
```js
const onlyActive = true // to get only active links set parameter to true
const chainId = 80001
const sender = '0x2331bca1f2de4661ed88a30c99a7a9449aa84195'
const limit = 10 // parameter specifies the number of claim links in response. Not required. Default: 0
const offset = 10 // parameter is used to exclude from a response the first N claim links. Not required. Default: 0

const {
  claimLinks, // claim links fetched according to search parameters
  resultSet // information about fetched data (count, offset, total)
} = await sdk.getSenderHistory({
  onlyActive,
  chainId,
  sender,
  limit,
  offset
}) 
```

## Receiver methods
```js
// claim link contains all needed info to render the claim page
const claimLink = await sdk.getClaimLink(claimUrl)

// const dest = "0x123..134" // ethereum address of the receiver
const txHash = await claimLink.redeem(dest)
```

## ClaimLink
Claim Link object contains methods and properties to facilitate both creation and redemption of the claim link. 
  
`ClaimLink.claimUrl` is the URL shared with recipient. It is never stored in a remote database, so this property is going be `null` on retrieval. New claim URL can be generated with a `claimLink.generateClaimUrl` method call if needed.  

### ClaimLink properties:
- _transferId_ (string, transfer unique id, e.g. "1695985897077")
- _tokenType_ (string, token standard type, one of `'NATIVE' | 'ERC20'`)
- _amount_ (string, atomic amount of tokens receiver going to claim, e.g. "1000000" for 1 USDC)
- _fee_ (string, atomic amount of tokens sender needs to pay as a fee, e.g. "100000" or 0.1 USDC)
- _totalAmount_ (string, total amount sender needs to deposit, _amount_ + _fee_, e.g. "1100000" or 1.1 USDC)
- _token_ (string, token contract address, e.g. "0x2791bca1f2de4661ed88a30c99a7a9449aa84174")
- _chainId_ (number, network chain ID, e.g. 147 for Polygon network)
- _sender_ (string, Sender's Ethereum address, e.g. "0x2331bca1f2de4661ed88a30c99a7a9449aa84195")
- _escrow_ (string, Escrow contract address "0x1111bca1f2de4661ed88a30c44a7a9449aa84106")
- _version_ (string, claim link version, e.g. "1")
- _claimUrl_ (string, the URL that shall be shared with recipient, e.g. `https://p2p.linkdrop.io/#/usdc?k=8uoxFBZtJZA72xHJzkdZnZoKbT15Swhn4f5z6jV8Q9U&s=JeGDRq7xAPRYhhYkXRJTXh1St97nRN2m2CQG27LzAnyEA4L4APm9GbDx6kDYEZYjmeGdJgyLpY1ap9FyPtogtG48r&i=mYfAE4p&c=137&v=1`


#### Get Claim Link Status
In order to get the latest status of the claim link, use the following method: 
```js
const { status, operations } = await claimLink.getStatus()
```

- _status_ (string, claim link status, one of `'created' | 'depositing' | 'deposited' | 'redeemed'| 'redeeming' | 'error' | 'refunded' | 'refunding' | 'cancelled'`)
- _operations_ (array of operations related to the claim link)

_operation_:  
 - _type_: (string, operation type, one of `'deposit' | 'redeem' | 'refund'`)
 - _timestamp_ (unix timestamp when operation was made)
 - _tx_hash_: (string, ethereum transaction hash corresponding to the operation)
 - _status_: (string, operation status, one of `'pending' | 'completed' | 'error'`)
 - _receiver_: (string, Receiver's Ethereum address, present only for redeem operations, e.g. "0x2331bca1f2de4661ed88a30c99a7a9449aa84195")