# Linkdrop P2P SDK

## 2.0.0-beta.3
- method parseVersion renamed to getVersionFromClaimUrl
- added error handling to method getVersionFromClaimUrl

## 2.0.0-beta.2
- added method to parse link for version
- added method to define version from escrow contract

## 2.0.0-beta.1
- added optional `apiUrl` parameter
- `apiKey` parameter transformed to optional

## 2.0.0-beta.0
- added "token" parameter to getSenderHistory method
- bug fix with escrow address for old links
- operations included to ClaimLink
- apiKey hidden from properties of ClaimLink
- expiration type changed to 'number'


## 2.0.0-alpha.10
- added getSenderHistory method
- removed `void` return from public methods
- added ValidationError

## 2.0.0-alpha.9
- update for getLimits method. token argumant is not required for NATIVE tokens
- bug fix for escrow address detection

## 2.0.0-alpha.8
- updated escrow contract definition
- no native token address is needed to create NATIVE link
- added limits (min and max amount that can be used to create link)
- support for native usdc for polygon network
- updated getDepositAuthorization method

## 2.0.0-alpha.7
- updated babel configuration file

## 2.0.0-alpha.6
- expiration is now optional for initialization of ClaimLink (default: 30 days)
- added babel loader plugins
- new escrow contract addresses for base, polygon and mumbai networks

## 2.0.0-alpha.5
- switch ethers method: toQuantity => toBeHex (with bytes length)

## 2.0.0-alpha.4
- revert

## 2.0.0-alpha.3
- updated helper to prevent 0x cut in private/public key or signature

## 2.0.0-alpha.2
- removed async function for TSignTypedData type

## 2.0.0-alpha.1
- removed console logs

## 2.0.0-alpha.0
- network tokens support
- link recovery added
- short links available
- new api
- new escrow contracts

## 1.0.4
- ethers v6 added
- added initialize method to ClaimLink

## 1.0.3
- fix for baseUrl (should be passed to ClaimLink)

## 1.0.2
- minor fix with data format

## 1.0.1
- signer removed
- new methods for modules (ClaimLink, LinkdropPaySDK)
- major updates
- axios removed
- added getRandomBytes
- added signTypedData
- updates for repository name and npm package name

## 0.0.19
- added apiKey to Zuplo endpoints

## 0.0.18
- removed getDepositAmount method from Linkdrop module

## 0.0.17
- updates for getDepositAuthorization method
- new escrow contract addresses

## 0.0.16
- updates related to Base network

## 0.0.13
- added Base chain support

## 0.0.12
- added getLinkStatus method

## 0.0.11
- big fix for api url suffix

## 0.0.10
- added new api urls + new jsonrpc urls

## 0.0.9
- added update for encodeLink/decodeLink methods

## 0.0.8
- added initialization for get linkdrop method

## 0.0.7
- update for generate link method return

## 0.0.6
- update for contract address

## 0.0.5
- fix for deposit data method

## 0.0.4
- update for claim link
- polygon support added

## 0.0.3

## 0.0.2

## 0.0.1