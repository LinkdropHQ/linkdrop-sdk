import ILinkdropP2P, {
  TCreateClaimLink,
  TConstructorArgs,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink,
  TGetLimits,
  TGetHistory
} from './types'
import { linkApi } from '../../api'
import { ValidationError } from '../../errors'
import {
  decodeLink,
  defineApiHost,
  parseLink,
  defineEscrowAddressByTokenSymbol
} from '../../helpers'
import { toBigInt } from 'ethers'
import ClaimLink from '../claim-link'
import { errors } from '../../texts'
import { ETokenAddress } from '../../types'
import * as configs from '../../configs'

class LinkdropP2P implements ILinkdropP2P {
  apiKey: string
  baseUrl: string

  constructor({
    apiKey,
    baseUrl
  }: TConstructorArgs) {
    if (!apiKey) {
      throw new ValidationError(errors.argument_not_provided('apiKey'))
    }
    this.apiKey = apiKey
    if (!baseUrl) {
      throw new ValidationError(errors.argument_not_provided('baseUrl'))
    }
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
      throw new ValidationError(errors.argument_not_provided('chainId'))
    }
    const apiHost = defineApiHost(chainId)
    if (!apiHost) {
      throw new ValidationError(errors.chain_not_supported())
    }
    if (!from) {
      throw new ValidationError(errors.argument_not_provided('from'))
    }

    if (!amount) {
      throw new ValidationError(errors.argument_not_provided('amount'))
    }

    if (!token && tokenType !== 'NATIVE') {
      throw new ValidationError(errors.argument_not_provided('token'))
    }

    const limitsResult = await this.getLimits({
      token: token || configs.nativeTokenAddress,
      chainId,
      tokenType
    })

    if (!limitsResult) {
      throw new Error(errors.limits_not_defined())
    }

    const {
      minTransferAmount,
      maxTransferAmount
    } = limitsResult

    if (toBigInt(amount) < toBigInt(minTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_more_than_minlimit(minTransferAmount.toString()))
    }

    if (toBigInt(amount) > toBigInt(maxTransferAmount)) {
      throw new ValidationError(errors.amount_should_be_less_than_maxlimit(maxTransferAmount.toString()))
    }

    return this._initializeClaimLink({
      token: token as ETokenAddress,
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

  getSenderHistory: TGetHistory = async ({
    onlyActive,
    chainId,
    sender,
    limit,
    offset
  }) => {
    const apiHost = defineApiHost(chainId)
    if (!apiHost) {
      throw new ValidationError(errors.chain_not_supported())
    }
    const {
      claim_links,
      result_set
    } = await linkApi.getHistory(
      apiHost,
      this.apiKey,
      sender,
      onlyActive,
      offset,
      limit
    )

    return {
      claimLinks: claim_links,
      resultSet: result_set
    }
  }

  getLimits: TGetLimits = async ({
    token, chainId, tokenType
  }) => {
    const apiHost = defineApiHost(chainId)
    if (!apiHost) {
      throw new ValidationError(errors.chain_not_supported())
    }

    let tokenAddress = token

    if (tokenType === 'ERC20') {
      if (!tokenAddress) {
        throw new ValidationError(errors.argument_not_provided('token'))
      }
    } else {
      tokenAddress = configs.nativeTokenAddress
    }
  
    const limits = await linkApi.getLimits(
      apiHost,
      this.apiKey,
      tokenAddress,
      tokenType
    )

    return {
      minTransferAmount: limits.min_transfer_amount,
      maxTransferAmount: limits.max_transfer_amount
    }
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
      sender,
      tokenSymbol
    } = decodeLink(claimUrl)

    const apiHost = defineApiHost(chainId)

    if (!apiHost) {
      throw new ValidationError(errors.chain_not_supported())
    }

    if (!tokenType) {
      throw new Error(errors.variable_cannot_be_defined('Token Type'))
    }

    const escrowAddress = defineEscrowAddressByTokenSymbol(chainId, tokenSymbol)

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
          token: token as ETokenAddress,
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
        token: token as ETokenAddress,
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
      throw new ValidationError(errors.chain_not_supported())
    }
    if (sender) {
      if (!transferId) {
        throw new ValidationError(errors.argument_not_provided('transferId'))
      }
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
        token: token as ETokenAddress,
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
      if (!txHash) {
        throw new ValidationError(errors.argument_not_provided('txHash'))
      }
      const { claim_link } = await linkApi.getTransferStatusByTxHash(
        apiHost,
        this.apiKey,
        txHash
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
        token: token as ETokenAddress,
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
