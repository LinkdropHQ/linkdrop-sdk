import { ethers } from 'ethers'

type TApproveERC721 = (
  tokenAddress: string,
  proxyContractAddress: string,
  provider: ethers.providers.Web3Provider
) => Promise<any>

export default TApproveERC721