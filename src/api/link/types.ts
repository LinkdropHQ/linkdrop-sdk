import { TClaimLinkItem, TTokenType } from '../../types'

type TDepositWithAuthResponse = {
  success: boolean,
  tx_hash: string
}

type TDepositWithAuth = (
  apiHost: string,
  apiKey: string,
  token: string,
  token_type: TTokenType,
  sender: string,
  escrow: string,
  transfer_id: string,
  expiration: string,
  amount: string,
  authorization: string
) => Promise<TDepositWithAuthResponse>

type TDepositWithResponse = {
  success: boolean,
  tx_hash: string
}

type TDeposit = (
  apiHost: string,
  apiKey: string,
  token: string,
  token_type: TTokenType,
  sender: string,
  escrow: string,
  transfer_id: string,
  expiration: string,
  amount: string,
  tx_hash: string
) => Promise<TDepositWithResponse>

type TRedeemLinkResponse = {
  success: boolean,
  tx_hash: string
}

type TRedeemLink = (
  apiHost: string,
  apiKey: string,
  receiver: string,
  sender: string,
  escrow: string,
  transfer_id: string,
  receiver_sig: string,
) => Promise<TRedeemLinkResponse>

type TRedeemRecoveredLinkResponse = {
  success: boolean,
  tx_hash: string
}

type TRedeemRecoveredLink = (
  apiHost: string,
  apiKey: string,
  receiver: string,
  sender: string,
  escrow: string,
  transfer_id: string,
  receiver_sig: string,
  sender_sig: string
) => Promise<TRedeemRecoveredLinkResponse>

type TGetTransferDataResponse = {
  claim_link: TClaimLinkItem,
  success: boolean
}

type TGetTransferData = (
  apiHost: string,
  apiKey: string,
  sender: string,
  transfer_id: string,
) => Promise<TGetTransferDataResponse>

type TGetTransferDataByTxHashResponse = {
  claim_link: TClaimLinkItem,
  success: boolean
}

type TGetTransferDataByTxHash = (
  apiHost: string,
  apiKey: string,
  tx_hash: string,
) => Promise<TGetTransferDataByTxHashResponse>

type TGetFeeResponse = {
  fee: string
  amount: string
  total_amount: string
  success: boolean
}

type TGetFee = (
  apiHost: string,
  apiKey: string,
  amount: string,
  tokenAddress: string,
  sender: string
) => Promise<TGetFeeResponse>

export type TRequests = {
  redeemLink: TRedeemLink
  redeemRecoveredLink: TRedeemRecoveredLink
  depositWithAuthorization: TDepositWithAuth
  getTransferStatus: TGetTransferData
  getTransferStatusByTxHash: TGetTransferDataByTxHash
  getFee: TGetFee,
  deposit: TDeposit
}
