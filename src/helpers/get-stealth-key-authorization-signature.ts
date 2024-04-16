import { TSignTypedData } from '../types'

type TGetSignature = (
  spendingPubKeyPrefix: number,
  spendingPubKey: string,
  viewingPubKeyPrefix: number,
  viewingPubKey: string,
  signTypedData: TSignTypedData,
  chainId: number
) => Promise<string>

const getSignature: TGetSignature = async (
  spendingPubKeyPrefix,
  spendingPubKey,
  viewingPubKeyPrefix,
  viewingPubKey,
  signTypedData,
  chainId
) => { 
  const types = {
    StealthKeys: [
      { name: 'spendingPubKeyPrefix', type: 'uint256'},
      { name: 'spendingPubKey', type: 'uint256'},
      { name: 'viewingPubKeyPrefix', type: 'uint256'},
      { name: 'viewingPubKey', type: 'uint256'}
    ]
  } 

  const domain = {
      name: "Umbra Stealth Key Registry",
      version: "1",
      chainId: chainId, // number, get from claim link URL  
      verifyingContract: "0x31fe56609C65Cd0C510E7125f051D440424D38f3"
   }
 
  const message = { 
    spendingPubKeyPrefix,
    spendingPubKey,
    viewingPubKeyPrefix,
    viewingPubKey,
  }

  const stealthKeysAuthorization = await signTypedData(domain, types, message)
  return stealthKeysAuthorization
}

export default getSignature