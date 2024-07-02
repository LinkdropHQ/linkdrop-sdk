// !!!! NOT FINISHED

// import { ethers } from 'ethers'
// import { TDomain, TSignTypedData } from '../../types'
// import { getValidAfterAndValidBefore, getDepositAuthorization } from '../../utils'


// const depositFee = ethers.parseUnits("0.1", 18)

// async function makeDeposit (
//   sponsored = true,
//   signTypedData: TSignTypedData,
//   sender: string,
//   to: string,
//   amount: string = String(ethers.parseUnits("100", 6)),
//   transferId: string,
//   expiration: string = String(Math.floor(Date.now() / 1000) + 60 * 60 * 24),
//   domain: TDomain,
//   chainId: number,
//   token: string,
//   feeAmount: string
// ) {
//   // Define some values for the deposit
//   const fee = sponsored ? 0 : depositFee
//   const [ validAfter, validBefore ] = getValidAfterAndValidBefore()
//   const tokenInstance = await ethers.getContractFactory("MockUSDC")

//   const feeAuthorization = await getDepositAuthorization(
//     signTypedData,
//     sender,
//     to,
//     amount,
//     validAfter,
//     validBefore,
//     transferId,
//     expiration,
//     domain,
//     chainId,
//     token,
//     feeAmount
//   )
  
//   await token.connect(sender).approve(linkdropEscrow.address, amount);
  
//   // User deposits MockTOKEN into LinkdropEscrow
//   await linkdropEscrow.connect(sender).deposit(
//     token.address,
//     transferId,
//     amount,
//     expiration,
//     feeToken,
//     fee,
//     feeAuthorization,
//     { value: fee }
//   );
//   return {
//     transferId,
//     amount,
//     expiration,
//   }
// }