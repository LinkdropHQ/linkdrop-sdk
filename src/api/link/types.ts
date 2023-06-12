import { AxiosResponse } from 'axios'

type TDepositResponse = {
    success: boolean,
    data: {
        tx_hash: string
    }
}

type TDeposit = (
    apiHost: string,
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
    data: {
        tx_hash: string
    }
}

type TRedeemLink = (
    apiHost: string,
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

export type TRequests = {
    redeemLink: TRedeemLink
    deposit: TDeposit
}
