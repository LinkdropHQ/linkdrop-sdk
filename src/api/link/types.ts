import { AxiosResponse } from 'axios'
import { TTransferStatus } from '../../types'

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
  status: TTransferStatus,
  amount: string
  expiration: string
  success: boolean
}

type TGetTransferData = (
  apiHost: string,
  apiKey: string,
  sender: string,
  transfer_id: string,
  chain_name: string
) => Promise<AxiosResponse<TGetTransferDataResponse>>


export type TRequests = {
  redeemLink: TRedeemLink
  deposit: TDeposit
  getTransferStatus: TGetTransferData
}
