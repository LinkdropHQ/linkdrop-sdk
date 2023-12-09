import ILinkdropP2P, {
  TCreateClaimLink,
  TConstructorArgs,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink,
  TGetLimits,
  TGetHistory,
  TGetVersionFromClaimUrl,
  TGetVersionFromEscrowContract,
  TGetCurrentFee
} from './types'
import { linkApi } from '../../api'
import { ValidationError } from '../../errors'
import {
  decodeLink,
  defineApiHost,
  updateOperations,
  defineEscrowAddress,
  parseQueryParams
} from '../../helpers'
import { generateKeypair } from '../../utils'
import { toBigInt } from 'ethers'
import ClaimLink from '../claim-link'
import { errors } from '../../texts'
import { ETokenAddress, TGetRandomBytes, TTokenType } from '../../types'
import escrows from '../../configs/escrows'
import * as configs from '../../configs'

class LinkdropP2P implements ILinkdropP2P {
  #apiKey: string | null
  baseUrl: string
  apiUrl: string
  getRandomBytes: TGetRandomBytes

  constructor({
    apiKey,
    baseUrl,
    apiUrl,
    getRandomBytes
  }: TConstructorArgs) {
    this.#apiKey = apiKey || null
    if (apiUrl) {
      this.apiUrl = apiUrl
    }
    if (!baseUrl) {
      throw new ValidationError(errors.argument_not_provided('baseUrl'))
    }
    this.baseUrl = baseUrl

    if (!getRandomBytes) {
      throw new ValidationError(errors.argument_not_provided('getRandomBytes'))
    }
    this.getRandomBytes = getRandomBytes
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
      token: token as ETokenAddress || configs.nativeTokenAddress,
      expiration: expiration ||  Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30),
      chainId,
      amount,
      sender: from.toLowerCase(),
      apiUrl: apiHost,
      apiKey: this.#apiKey,
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
      this.#apiKey,
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
      this.#apiKey,
      tokenAddress,
      tokenType
    )

    return {
      minTransferAmount: limits.min_transfer_amount,
      maxTransferAmount: limits.max_transfer_amount
    }
  }

  _initializeClaimLink: TInitializeClaimLink = async (claimLinkData) => {
    let transferId = claimLinkData.transferId
    let feeAmount = claimLinkData.feeAmount
    let totalAmount = claimLinkData.totalAmount
    let feeAuthorization = claimLinkData.feeAuthorization
    let feeToken = claimLinkData.feeToken

    let keyPair
    if (!transferId) {
      keyPair = await generateKeypair(this.getRandomBytes)
      transferId = keyPair.address
    }

    if (!feeAmount || !totalAmount) {
      const feeData = await this._getCurrentFee(
        claimLinkData.apiUrl,
        claimLinkData.amount,
        claimLinkData.token,
        claimLinkData.tokenType,
        claimLinkData.sender,
        transferId as string,
        claimLinkData.expiration
      )
      feeAmount = feeData.fee_amount
      totalAmount = feeData.total_amount
      feeAuthorization = feeData.fee_authorization
      feeToken = feeData.fee_token
    }

    if (!transferId) {
      throw new Error(errors.variable_is_not_valid(
        'transferId',
        'string',
        transferId
      ))
    }

    if (!feeToken) {
      throw new Error(errors.variable_is_not_valid(
        'feeToken',
        'string',
        feeToken
      ))
    }

    if (!totalAmount) {
      throw new Error(errors.variable_is_not_valid(
        'totalAmount',
        'string',
        totalAmount
      ))
    }

    if (!feeAmount) {
      throw new Error(errors.variable_is_not_valid(
        'feeAmount',
        'string',
        feeAmount
      ))
    }

    const claimLink = new ClaimLink({
      ...claimLinkData,
      transferId,
      getRandomBytes: this.getRandomBytes,
      linkKey: keyPair ? keyPair.privateKey : null,
      feeAmount: feeAmount,
      feeToken: feeToken as string,
      feeAuthorization,
      totalAmount
    })

    return claimLink
  }

  _getCurrentFee: TGetCurrentFee = async (
    apiUrl,
    amount,
    token,
    tokenType,
    sender,
    transferId,
    expiration
  ) => {
    const result = await linkApi.getFee(
      apiUrl,
      this.#apiKey,
      amount,
      token,
      sender.toLowerCase(),
      tokenType,
      transferId,
      expiration
    )

    return result
  }

  getClaimLink: TGetClaimLink = async (claimUrl) => {
    const {
      transferId,
      chainId,
    } = decodeLink(claimUrl)

    const apiHost = defineApiHost(chainId, this.apiUrl)

    if (!apiHost) {
      throw new ValidationError(errors.chain_not_supported())
    }

    const escrowAddress = defineEscrowAddress(chainId)

    if (!escrowAddress) {
      throw new Error(errors.variable_cannot_be_defined('Escrow address'))
    }

    const { claim_link } = await linkApi.getTransferStatus(
      apiHost,
      this.#apiKey,
      transferId
    )

    const {
      token,
      expiration,
      amount,
      token_type,
      operations,
      sender,
      fee_token,
      fee_amount,
      total_amount,
      escrow
    } = claim_link

    const claimLinkData = {
      token: token as ETokenAddress,
      expiration,
      chainId,
      feeAmount: fee_amount,
      feeToken: fee_token,
      totalAmount: total_amount as string,
      amount,
      sender,
      apiUrl: apiHost,
      apiKey: this.#apiKey,
      transferId: transferId.toLowerCase(),
      claimUrl,
      operations: updateOperations(operations),
      tokenType: (token_type as TTokenType),
      baseUrl: this.baseUrl,
      escrowAddress: escrow
    }
    return this._initializeClaimLink(claimLinkData)
  }

  retrieveClaimLink: TRetrieveClaimLink = async ({
    chainId,
    txHash,
    transferId
  }) => {
    const apiHost = defineApiHost(chainId, this.apiUrl)
    if (!apiHost) {
      throw new ValidationError(errors.chain_not_supported())
    }
    if (transferId) {
      const { claim_link } = await linkApi.getTransferStatus(
        apiHost,
        this.#apiKey,
        transferId
      )

      const {
        token,
        expiration,
        amount,
        token_type,
        operations,
        fee_token,
        fee_amount,
        total_amount,
        sender
      } = claim_link

      const claimLinkData = {
        token: token as ETokenAddress,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiUrl: apiHost,
        apiKey: this.#apiKey,
        tokenType: (token_type as TTokenType),
        transferId: transferId.toLowerCase(),
        baseUrl: this.baseUrl,
        operations: updateOperations(operations),
        feeAmount: fee_amount,
        feeToken: fee_token,
        totalAmount: total_amount as string
      }
      return this._initializeClaimLink(claimLinkData)
    } else if (txHash) {
      const { claim_link } = await linkApi.getTransferStatusByTxHash(
        apiHost,
        this.#apiKey,
        txHash
      )
      const {
        token,
        expiration,
        amount,
        sender,
        transfer_id,
        token_type,
        operations,
        fee_token,
        fee_amount,
        total_amount
      } = claim_link

      const claimLinkData = {
        token: token as ETokenAddress,
        expiration,
        chainId,
        amount,
        sender: sender.toLowerCase(),
        apiUrl: apiHost,
        apiKey: this.#apiKey,
        transferId: (transfer_id as string).toLowerCase(),
        tokenType: (token_type as TTokenType),
        operations: updateOperations(operations),
        baseUrl: this.baseUrl,
        feeAmount: fee_amount,
        feeToken: fee_token,
        totalAmount: total_amount as string
      }
      return this._initializeClaimLink(claimLinkData)
    } else {
      throw new ValidationError(errors.at_least_one_argument_not_provided(['txHash', 'transferId']))
    }
  }
}

export default LinkdropP2P
