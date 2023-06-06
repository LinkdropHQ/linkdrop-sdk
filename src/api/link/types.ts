import { AxiosResponse } from 'axios'

type TDepositResponse = {
  success: boolean,
  data: {
    tx_hash: string
  }
}

type TDeposit = (
  apiHost: string,
  from: string,
  token: string,
  to: string,
  amount: string,
  validAfter: number,
  validBefore: number,
  nonce: string,
  v: string,
  r: string,
  s: string
) => Promise<
  AxiosResponse<
    TDepositResponse
  >
>

type TRedeemLinkResponse = {
  success: boolean,
  data: {
    tx_hash: string
  }
}

type TRedeemLink = (
  apiHost: string,
  receiver: string,
  sender: string,
  token: string,
  transferId: string,
  expiration: number,
  receiverSig: string,
  senderSig: string
) => Promise<
  AxiosResponse<
    TRedeemLinkResponse
  >
>

export type TRequests = {
  redeemLink: TRedeemLink
  deposit: TDeposit
}
