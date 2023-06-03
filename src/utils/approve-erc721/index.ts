import { ethers } from 'ethers'
import { ERC721Contract } from '../../abi'
import TApproveERC721 from './types'

const approveERC721: TApproveERC721 = async (
  tokenAddress,
  proxyContractAddress,
  provider
) => {
  const signer = await provider.getSigner()
  const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract.abi, signer)
  const result = await contractInstance.setApprovalForAll(proxyContractAddress, true)
  console.log({ result })
  return result
}

export default approveERC721