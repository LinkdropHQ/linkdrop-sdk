import { ethers } from 'ethers'
import { TDomain, TEscrowPaymentDomain } from '../'

export type TSignerCustomized = ethers.Signer & { _signTypedData?: (
  domain: TDomain | TEscrowPaymentDomain, types: any, message: any
) => string }