# Linkdrop SDK


## 2.1.14
- added claiming_finished_auto_redirect property

## 2.1.13
- fix for factory address type

## 2.1.12
- get factory address for claim link

## 2.1.11
- added X Layer network support

## 2.1.10
- added additional_wallets_on param to link

## 2.1.9
- package rename to linkdrop-batch-sdk

## 2.1.8
- added support for immutableZkevm network
- removed support for baseGoerli, goerli and mumbai

## 2.1.7
- token_name, linkdrop_token, token_image properties added to link params

## 2.1.6
- available_wallets_on => preferred_wallet_on
- available_wallets property removed

## 2.1.5
- added available_wallets_on property

## 2.1.4
- added claiming_finished_button_on property

## 2.1.3
- updates for src=d param (getLinks method of batch)

## 2.1.2
- updates for claimHostUrl param (getLinks method of batch)

## 2.1.1
- added testnets apiUrl

## 2.1.0
- added apiKey as param for LinkdropSDK 

## 2.0.9
- added src param to link (src=d)

## 2.0.8
- added 'base' and 'baseGoerli' network support

## 2.0.7
- 'only_preferred_wallet' removed

## 2.0.6
- 'only_preferred_wallet' bug fix (wrong type: string -> boolean)

## 2.0.5
- 'only_preferred_wallet' property added to 'api/v2/claim-links/:link_id' endpoint

## 2.0.4
- 'sponsored' property removed from batch

## 2.0.3
- Added generateAccount util function to LinkdropSDK

## 2.0.2
- Additional parameters of link

## 2.0.1
- Claim link ("/#/claim/..." => "/#/redeem/...")

## 2.0.0
- Updated default server url