import ILinkdrop, {
  TCreateClaimLink,
  TConstructorArgs,
  TGetClaimLink,
  TRetrieveClaimLink
} from './types'
import { linkApi } from '../../api'
import { decodeLink, defineApiHost, parseLink, defineEscrowAddress } from '../../helpers'
import ClaimLink from '../claim-link'
import { errors } from '../../texts'

class LinkdropPaySDK implements ILinkdrop {
  apiKey: string
  baseUrl: string

  constructor({
    apiKey,
    baseUrl
  }: TConstructorArgs) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  createClaimLink: TCreateClaimLink = async ({
    token,
    expiration,
    chainId,
    amount,
    from
  }) => {
    if (!chainId) {
      throw new Error(errors.argument_not_provided('chainId'))
    }
    const apiHost = defineApiHost(chainId)
    if (!apiHost) {
      throw new Error(errors.chain_not_supported())
    }
    if (!from) {
      throw new Error(errors.argument_not_provided('from'))
    }
    if (!expiration) {
      throw new Error(errors.argument_not_provided('expiration'))
    }
    if (!amount) {
      throw new Error(errors.argument_not_provided('amount'))
    }
    if (!token) {
      throw new Error(errors.argument_not_provided('token'))
    }

    const claimLink = new ClaimLink({
      token,
      expiration,
      chainId,
      amount,
      sender: from,
      apiHost,
      apiKey: this.apiKey
    })

    return claimLink
  }

  getClaimLink: TGetClaimLink = async (claimUrl) => {
    const {
      transferId,
      chainId
    } = decodeLink(claimUrl)
    const apiHost = defineApiHost(chainId)

    if (!apiHost) {
      throw new Error(errors.chain_not_supported())
    }
    const escrowAddress = String(defineEscrowAddress(chainId))
    const {
      sender
    } = await parseLink(
      chainId,
      escrowAddress,
      claimUrl
    )
    const { escrow_payment } = await linkApi.getTransferStatus(
      apiHost,
      this.apiKey,
      sender,
      transferId
    )
    const claimLinkData = {
      token: escrow_payment.token,
      expiration: escrow_payment.expiration,
      chainId,
      amount: escrow_payment.amount,
      sender,
      apiHost,
      apiKey: this.apiKey,
      transferId: transferId,
      claimUrl
    }
    const claimLink = new ClaimLink(claimLinkData)
    return claimLink
  }

  retrieveClaimLink: TRetrieveClaimLink = async ({
    chainId,
    txHash,
    sender,
    transferId
  }) => {
    const apiHost = defineApiHost(chainId)
    if (!apiHost) {
      throw new Error(errors.chain_not_supported())
    }
    if (sender && transferId) {
      const { escrow_payment } = await linkApi.getTransferStatus(
        apiHost,
        this.apiKey,
        sender,
        transferId
      )
      const claimLinkData = {
        token: escrow_payment.token,
        expiration: escrow_payment.expiration,
        chainId,
        amount: escrow_payment.amount,
        sender: escrow_payment.sender,
        apiHost,
        apiKey: this.apiKey,
        transferId: transferId
      }
      const claimLink = new ClaimLink(claimLinkData)
      return claimLink
    } else {
      const { escrow_payment } = await linkApi.getTransferStatusByTxHash(
        apiHost,
        this.apiKey,
        txHash as string
      )
      const claimLinkData = {
        token: escrow_payment.token,
        expiration: escrow_payment.expiration,
        chainId,
        amount: escrow_payment.amount,
        sender: escrow_payment.sender,
        apiHost,
        apiKey: this.apiKey,
        transferId: transferId
      }
      const claimLink = new ClaimLink(claimLinkData)
      return claimLink
    }
  }
}

export default LinkdropPaySDK
