import { AxiosResponse } from 'axios'
import { TTransferStatus, TClaimLinkItem } from '../../types'

type TDepositResponse = {
  success: boolean,
  txHash: string
}

type TDeposit = (
  apiHost: string,
  apiKey: string,
  sender: string,
  escrow: string,
  transfer_id: string,
  expiration: string,
  amount: string,
  authorization: string
) => Promise<
  AxiosResponse<
    TDepositResponse
  >
>

type TRedeemLinkResponse = {
  success: boolean,
  txHash: string
}

type TRedeemLink = (
  apiHost: string,
  apiKey: string,
  receiver: string,
  sender: string,
  escrow: string,
  transfer_id: string,
  receiver_sig: string,
  sender_sig: string
) => Promise<
  AxiosResponse<
    TRedeemLinkResponse
  >
>

type TGetTransferDataResponse = {
  escrow_payment: TClaimLinkItem,
  success: boolean
}

type TGetTransferData = (
  apiHost: string,
  apiKey: string,
  sender: string,
  transfer_id: string,
) => Promise<AxiosResponse<TGetTransferDataResponse>>

type TGetTransferDataByTxHashResponse = {
  escrow_payment: TClaimLinkItem,
  success: boolean
}

type TGetTransferDataByTxHash = (
  apiHost: string,
  apiKey: string,
  tx_hash: string,
) => Promise<AxiosResponse<TGetTransferDataByTxHashResponse>>

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
) => Promise<AxiosResponse<TGetFeeResponse>>


export type TRequests = {
  redeemLink: TRedeemLink
  deposit: TDeposit
  getTransferStatus: TGetTransferData
  getTransferStatusByTxHash: TGetTransferDataByTxHash
  getFee: TGetFee
}
