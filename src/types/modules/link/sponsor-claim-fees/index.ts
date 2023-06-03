type TSponsorClaimFees = (
  nativeTokenAmount: string
) => Promise<{ txHash?: string } | void>

export default TSponsorClaimFees