import ILinkdropP2P, {
  TCreateClaimLink,
  TConstructorArgs,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink,
  TGetLimits,
  TGetHistory,
  TGetVersionFromClaimUrl,
  TGetVersionFromEscrowContract
} from './types'
import { linkApi } from '../../api'
import { ValidationError } from '../../errors'
import {
  decodeLink,
  defineApiHost,
  parseLink,
  updateOperations,
  defineEscrowAddressByTokenSymbol,
  parseQueryParams
} from '../../helpers'
import { toBigInt } from 'ethers'
import ClaimLink from '../claim-link'
import { errors } from '../../texts'
import { ETokenAddress, TTokenType } from '../../types'
import escrows from '../../configs/escrows'
import * as configs from '../../configs'

class LinkdropP2P implements ILinkdropP2P {
  apiKey: string | null
  baseUrl: string
  apiUrl: string

  constructor({
    apiKey,
    baseUrl,
    apiUrl
  }: TConstructorArgs) {
    this.apiKey = apiKey || null
    if (apiUrl) {
      this.apiUrl = apiUrl
    }
    if (!baseUrl) {
      throw new ValidationError(errors.argument_not_provided('baseUrl'))
    }
    this.baseUrl = baseUrl
  }

  getVersionFromClaimUrl: TGetVersionFromClaimUrl = (claimUrl) => {
    const hashIndex = claimUrl.indexOf('#');
    const paramsString = claimUrl.substring(hashIndex + 1).split('?')[1]
    const parsedParams = parseQueryParams(paramsString)
    const version = parsedParams["v"]
    if (!version) {
      throw new Error(errors.version_not_provided())
    }

    return version
  }

  createClaimLink: TCreateClaimLink = async ({
    token,
    expiration,
    chainId,
    amount,
    from,
    tokenType
  }) => {
    const startCreateClaimLink = +(new Date())
    if (!chainId) {
      throw new ValidationError(errors.argument_not_provided('chainId'))
    }
    const apiHost = defineApiHost(chainId, this.apiUrl)
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
    const limitsResultStart = +(new Date())

    const limitsResult = await this.getLimits({
      token: token || configs.nativeTokenAddress,
      chainId,
      tokenType
    })


    console.log({
      limitsResult: limitsResultStart - startCreateClaimLink
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
    offset,
    token
  }) => {
    const apiHost = defineApiHost(chainId, this.apiUrl)
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
      limit,
      token
    )

    const claimLinks = claim_links.map(claimLink => {
      const claimLinkUpdated = {
        ...claimLink,
        transferId: claimLink.transfer_id,
        tokenType: claimLink.token_type,
        chainId: claimLink.chain_id,
        totalAmount: claimLink.total_amount,
        operations: updateOperations(claimLink.operations)
      }

      delete claimLinkUpdated.transfer_id
      delete claimLinkUpdated.created_at
      delete claimLinkUpdated.updated_at
      delete claimLinkUpdated.total_amount
      delete claimLinkUpdated.chain_id
      delete claimLinkUpdated.token_type

      return claimLinkUpdated
    })

    return {
      claimLinks,
      resultSet: result_set
    }
  }


  getVersionFromEscrowContract: TGetVersionFromEscrowContract = (escrowAddress) => {
    const escrowVersions = Object.keys(escrows)
    const result = escrowVersions.find(version => {
      const escrowsForVersion = escrows[version]
      if (escrowsForVersion && escrowsForVersion.length > 0) {
        return escrowsForVersion.find(item => item.toLowerCase() === escrowAddress.toLowerCase())
      }
    })

    if (!result) {
      throw new Error(errors.version_not_found())
    }

    return result
  }

  getLimits: TGetLimits = async ({
    token, chainId, tokenType
  }) => {
    const apiHost = defineApiHost(chainId, this.apiUrl)
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
    const timeInitializeStarted = +(new Date())

    const claimLink = new ClaimLink(claimLinkData)
    await claimLink.initialize()
    const timeInitializeFinished = +(new Date())
    console.log({
      _initializeClaimLink: timeInitializeFinished - timeInitializeStarted
    })
    return claimLink
  }

  getClaimLink: TGetClaimLink = async (claimUrl) => {
    const startTime = +(new Date())
    const {
      transferId,
      chainId,
      tokenType,
      sender,
      tokenSymbol
    } = decodeLink(claimUrl)
    const timeAfterDecode = +(new Date())
    console.log({
      decodeTime: timeAfterDecode - startTime
    })

    const apiHost = defineApiHost(chainId, this.apiUrl)

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
      const timeAfteLinkParse = +(new Date())
      console.log({
        parseTime: timeAfteLinkParse - timeAfterDecode
      })

      if (linkParsed) {
        const { claim_link } = await linkApi.getTransferStatus(
          apiHost,
          this.apiKey,
          linkParsed.sender.toLowerCase(),
          transferId
        )
        const timeAfteGetTransferStatus = +(new Date())
        console.log({
          getTransferStatus: timeAfteGetTransferStatus - timeAfteLinkParse
        })

        const {
          token,
          expiration,
          amount,
          token_type,
          operations
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
          operations: updateOperations(operations),
          tokenType: (token_type as TTokenType),
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
      const getTransferStatus = +(new Date())
      console.log({
        parseTime: getTransferStatus - timeAfterDecode
      })

      const {
        token,
        expiration,
        amount,
        token_type,
        operations
      } = claim_link

      const claimLinkData = {
        token: token as ETokenAddress,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiHost,
        operations: updateOperations(operations),
        apiKey: this.apiKey,
        transferId: transferId.toLowerCase(),
        claimUrl,
        tokenType: (token_type as TTokenType),
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
    const apiHost = defineApiHost(chainId, this.apiUrl)
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
        token_type,
        operations
      } = claim_link

      const claimLinkData = {
        token: token as ETokenAddress,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiHost,
        apiKey: this.apiKey,
        tokenType: (token_type as TTokenType),
        transferId: transferId.toLowerCase(),
        baseUrl: this.baseUrl,
        operations: updateOperations(operations)
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
        token_type,
        operations
      } = claim_link

      const claimLinkData = {
        token: token as ETokenAddress,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiHost,
        apiKey: this.apiKey,
        transferId: (transfer_id as string).toLowerCase(),
        tokenType: (token_type as TTokenType),
        operations: updateOperations(operations),
        baseUrl: this.baseUrl
      }
      return this._initializeClaimLink(claimLinkData)
    }
  }
}

export default LinkdropP2P
