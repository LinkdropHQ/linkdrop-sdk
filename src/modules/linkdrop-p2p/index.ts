import ILinkdropP2P, {
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

class LinkdropP2P implements ILinkdropP2P {
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
      sender: from.toLowerCase(),
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
        const { claim_link } = await linkApi.getTransferStatus(
          apiHost,
          this.apiKey,
          linkParsed.sender.toLowerCase(),
          transferId
        )
        const {
          token,
          expiration,
          amount,
          token_type
        } = claim_link
        const claimLinkData = {
          token,
          expiration,
          chainId,
          amount,
          sender: linkParsed.sender.toLowerCase(),
          apiHost,
          apiKey: this.apiKey,
          transferId: transferId.toLowerCase(),
          claimUrl,
          tokenType: token_type,
          baseUrl: this.baseUrl
        }
        return this._initializeClaimLink(claimLinkData)
      } else {
        throw new Error(errors.link_parse_failed())
      }
      
    } else {
      const { claim_link } = await linkApi.getTransferStatus(
        apiHost,
        this.apiKey,
        sender.toLowerCase(),
        transferId
      )
      const {
        token,
        expiration,
        amount,
        token_type
      } = claim_link
      const claimLinkData = {
        token,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiHost,
        apiKey: this.apiKey,
        transferId: transferId.toLowerCase(),
        claimUrl,
        tokenType: token_type,
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
      const { claim_link } = await linkApi.getTransferStatus(
        apiHost,
        this.apiKey,
        sender.toLowerCase(),
        transferId
      )
      const {
        token,
        expiration,
        amount,
        token_type
      } = claim_link
      const claimLinkData = {
        token,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiHost,
        apiKey: this.apiKey,
        tokenType: token_type,
        transferId: transferId.toLowerCase(),
        baseUrl: this.baseUrl
      }
      return this._initializeClaimLink(claimLinkData)
    } else {
      const { claim_link } = await linkApi.getTransferStatusByTxHash(
        apiHost,
        this.apiKey,
        txHash as string
      )
      const {
        token,
        expiration,
        amount,
        sender,
        transfer_id,
        token_type
      } = claim_link
      const claimLinkData = {
        token,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiHost,
        apiKey: this.apiKey,
        transferId: transfer_id.toLowerCase(),
        tokenType: token_type,
        baseUrl: this.baseUrl
      }
      return this._initializeClaimLink(claimLinkData)
    }
  }
}

export default LinkdropP2P