import ILinkdrop, {
  TCreateClaimLink,
  TConstructorArgs,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink
} from './types'
import { linkApi } from '../../api'
import {
  decodeLink,
  defineApiHost,
  parseLink,
  defineEscrowAddress
} from '../../helpers'
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
    from,
    tokenType
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

    return this._initializeClaimLink({
      token,
      expiration,
      chainId,
      amount,
      sender: from,
      apiHost,
      apiKey: this.apiKey,
      tokenType,
      baseUrl: this.baseUrl
    })
  }

  _initializeClaimLink: TInitializeClaimLink = async (claimLinkData) => {
    const claimLink = new ClaimLink(claimLinkData)
    await claimLink.initialize()
    return claimLink
  } 

  getClaimLink: TGetClaimLink = async (claimUrl) => {
    const {
      transferId,
      chainId,
      tokenType,
      sender
    } = decodeLink(claimUrl)
    const apiHost = defineApiHost(chainId)

    if (!apiHost) {
      throw new Error(errors.chain_not_supported())
    }

    if (!tokenType) {
      throw new Error(errors.variable_cannot_be_defined('Token Type'))
    }

    const escrowAddress = defineEscrowAddress(chainId, tokenType)

    if (!escrowAddress) {
      throw new Error(errors.variable_cannot_be_defined('Escrow address'))
    }

    if (!sender) {
      const linkParsed = await parseLink(
        chainId,
        escrowAddress,
        claimUrl
      )
      if (linkParsed) {
        const { escrow_payment } = await linkApi.getTransferStatus(
          apiHost,
          this.apiKey,
          linkParsed.sender,
          transferId
        )
        const claimLinkData = {
          token: escrow_payment.token,
          expiration: escrow_payment.expiration,
          chainId,
          amount: escrow_payment.amount,
          sender: linkParsed.sender,
          apiHost,
          apiKey: this.apiKey,
          transferId: transferId.toLowerCase(),
          claimUrl,
          tokenType: escrow_payment.token_type,
          baseUrl: this.baseUrl
        }
        return this._initializeClaimLink(claimLinkData)
      } else {
        throw new Error(errors.link_parse_failed())
      }
      
    } else {
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
        transferId: transferId.toLowerCase(),
        claimUrl,
        tokenType: escrow_payment.token_type,
        baseUrl: this.baseUrl
      }
      return this._initializeClaimLink(claimLinkData)
    } 
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
        tokenType: escrow_payment.token_type,
        transferId: transferId.toLowerCase(),
        baseUrl: this.baseUrl
      }
      return this._initializeClaimLink(claimLinkData)
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
        transferId: escrow_payment.transfer_id.toLowerCase(),
        tokenType: escrow_payment.token_type,
        baseUrl: this.baseUrl
      }
      return this._initializeClaimLink(claimLinkData)
    }
  }
}

export default LinkdropPaySDK
