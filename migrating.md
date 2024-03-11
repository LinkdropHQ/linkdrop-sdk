# Migrating from v2
## Initializing SDK
```ts
// Initiliazing SDK in v2
const sdk = LinkdropP2P({
  apiKey,
  baseUrl,
  apiUrl
}) 

// Initiliazing SDK in v3 (getRandomBytes is passed on LinkdropP2P initialization)
const getRandomBytes = (length) => { 
  return new Uint8Array(crypto.randomBytes(length));
} 
const sdk = LinkdropP2P({
  apiKey,
  baseUrl,
  apiUrl,
  getRandomBytes
}) 
```

## Updating amount
```ts
// Updating amount in v2
const { amount, fee, totalAmount } = await claimLink.updateAmount(amount)

// Updating amount in v3; fee renamed to feeAmount, feeToken added
// feeToken is a token contract address that should cover fees
// when token is a stablecoin fees are accrued in the token
// otherwise fees should be paid in native tokens (ETH/MATIC)
const { amount, feeAmount, totalAmount, feeToken } = await claimLink.updateAmount(amount)
```

## Depositing USDC gaslessly
 ```ts
// Depositing USDC gaslessly in v2
const { claimUrl, transferId, txHash } = await claimLink.depositWithAuthorization({ signTypedData, getRandomBytes })

// Updating amount in v3; no need to pass getRandomBytes function as we passed to the SDK constructor 
const { claimUrl, transferId, txHash } = await claimLink.depositWithAuthorization({ signTypedData })
```
## Depositing native tokens and ERC20 tokens
```ts
// depositing native tokens in v2
const { claimUrl, transferId, txHash } = await claimLink.deposit({ sendTransaction, getRandomBytes })

// depositing native tokens in v3; no need to pass getRandomBytes function as we passed to the SDK constructor 
const { claimUrl, transferId, txHash } = await claimLink.deposit({ sendTransaction })
```
## Retrieving Claim Link details
```ts
// Retrieving Claim Link details in v2
const claimLink = await sdk.retrieveClaimLink({ chainId, sender, transferId })

// Retrieving Claim Link details in v3; no need to pass sender address  
const claimLink = await sdk.retrieveClaimLink({ chainId, transferId })
```
