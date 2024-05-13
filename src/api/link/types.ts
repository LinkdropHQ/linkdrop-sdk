import { TClaimLinkItem, TTokenType } from '../../types'
import { TDeposit } from './deposit/types'
import { TDepositWithAuth } from './deposit-with-authorization/types'
import { TDepositERC721 } from './deposit-erc721/types'
import { TDepositERC1155 } from './deposit-erc1155/types'

type TRedeemLinkResponse = {
  success: boolean,
  tx_hash: string
}

type TRedeemLink = (
  apiHost: string,
  apiKey: string | null,
  receiver: string,
  transfer_id: string,
  receiver_sig: string,
  token?: string,
  sender?: string,
  escrow?: string
) => Promise<TRedeemLinkResponse>

type TRedeemRecoveredLinkResponse = {
  success: boolean,
  tx_hash: string
}

type TRedeemRecoveredLink = (
  apiHost: string,
  apiKey: string | null,
  receiver: string,
  sender: string,
  escrow: string,
  transfer_id: string,
  receiver_sig: string,
  sender_sig: string,
  token: string
) => Promise<TRedeemRecoveredLinkResponse>

type TGetTransferDataResponse = {
  claim_link: TClaimLinkItem,
  success: boolean
}

type TGetTransferData = (
  apiHost: string,
  apiKey: string | null,
  transfer_id: string,
) => Promise<TGetTransferDataResponse>

type TGetTransferDataByTxHashResponse = {
  claim_link: TClaimLinkItem,
  success: boolean
}

type TGetTransferDataByTxHash = (
  apiHost: string,
  apiKey: string | null,
  tx_hash: string,
) => Promise<TGetTransferDataByTxHashResponse>

type TGetFeeResponse = {
  amount: string
  total_amount: string
  max_transfer_amount: string
  min_transfer_amount: string
  fee_token: string
  fee_amount: string
  fee_authorization: string
  success: boolean
}

type TGetFee = (
  apiHost: string,
  apiKey: string | null,
  tokenAddress: string,
  sender: string,
  tokenType: TTokenType,
  transferId: string,
  expiration: number,
  amount: string,
  tokenId?: string
) => Promise<TGetFeeResponse>

type TGetLimitsResponse = {
  success: boolean
  max_transfer_amount: string
  min_transfer_amount: string
  min_transfer_amount_usd: string
  max_transfer_amount_usd: string
}

type TGetLimits = (
  apiHost: string,
  apiKey: string | null,
  tokenAddress: string,
  tokenType: TTokenType
) => Promise<TGetLimitsResponse>

type TGetHistoryResponse = {
  success: boolean
  claim_links: TClaimLinkItem[]
  result_set: {
    total: number
    count: number
    offset: number
  }
}

type TGetHistory = (
  apiHost: string,
  apiKey: string | null,
  sender: string,
  onlyActive?: boolean,
  offset?: number,
  limit?: number,
  token?: string
) => Promise<TGetHistoryResponse>

export type TRequests = {
  redeemLink: TRedeemLink
  redeemRecoveredLink: TRedeemRecoveredLink
  depositWithAuthorization: TDepositWithAuth
  getTransferStatus: TGetTransferData
  getTransferStatusByTxHash: TGetTransferDataByTxHash
  getFee: TGetFee,
  deposit: TDeposit,
  depositERC721: TDepositERC721,
  depositERC1155: TDepositERC1155,
  getLimits: TGetLimits,
  getHistory: TGetHistory
}
