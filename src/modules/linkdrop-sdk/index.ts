import ILinkdropSDK, {
  TCreateClaimLink,
  TConstructorArgs,
  TGetClaimLink,
  TRetrieveClaimLink,
  TInitializeClaimLink,
  TGetLimits,
  TGetHistory,
  TGetVersionFromClaimUrl,
  TGetVersionFromEscrowContract,
  TGetCurrentFee,
  TGetLinkSourceFromClaimUrl
} from './types'
import { linkApi } from '../../api'
import { ValidationError } from '../../errors'
import {
  decodeLink,
  defineApiHost,
  updateOperations,
  getVersionFromClaimUrl,
  getLinkSourceFromClaimUrl,
  getChainIdFromDashboardLink,
  defineDashboardApiHost,
  defineVersionByEscrow,
  getTransferIdFromDashboardLink,
  decryptMessage
} from '../../helpers'
import { generateKeypair } from '../../utils'
import { toBigInt, ethers } from 'ethers'
import ClaimLink from '../claim-link'
import { errors } from '../../texts'
import {
  ETokenAddress,
  TGetRandomBytes,
  TTokenType,
  TDeploymentType,
  TClaimLinkSource,
  THistoryItem
} from '../../types'
import * as configs from '../../configs'
import * as LinkdropP2PV2 from 'linkdrop-p2p-sdk2'
import * as LinkdropP2PV3_11 from 'linkdrop-p2p-sdk3.11.0-beta'


class LinkdropSDK implements ILinkdropSDK {
  #apiKey: string | null
  baseUrl: string
  apiUrl: string
  deployment: TDeploymentType = 'LD'
  getRandomBytes: TGetRandomBytes

  constructor({
    apiKey,
    baseUrl,
    apiUrl,
    deployment,
    getRandomBytes
  }: TConstructorArgs) {

    this.#apiKey = apiKey || null

    if (deployment) {
      if (deployment !== 'CBW' && deployment !== 'LD') {
        throw new ValidationError(
          errors.invalid_deployment_property(),
          'INVALID_DEPLOYMENT_PROPERTY'
        )
      }
      this.deployment = deployment
    }

    if (apiUrl) {
      this.apiUrl = apiUrl
    }
    if (!baseUrl) {
      throw new ValidationError(
        errors.argument_not_provided('baseUrl', String(baseUrl)),
        'BASE_URL_NOT_PROVIDED'
      )
    }
    this.baseUrl = baseUrl

    if (!getRandomBytes) {
      throw new ValidationError(
        errors.argument_not_provided('getRandomBytes', String(getRandomBytes)),
        'GET_RANDOM_BYTES_NOT_PROVIDED'
      )
    }
    this.getRandomBytes = getRandomBytes
  }

  getVersionFromClaimUrl: TGetVersionFromClaimUrl = (claimUrl) => {
    return getVersionFromClaimUrl(claimUrl)
  }

  createClaimLink: TCreateClaimLink = async ({
    token,
    expiration,
    chainId,
    amount,
    from,
    tokenType,
    tokenId,
    message,
    signTypedData
  }) => {
    if (!chainId) {
      throw new ValidationError(
        errors.argument_not_provided('chainId', String(chainId)),
        'CHAIN_ID_NOT_PROVIDED'
      )
    }
    const apiHost = defineApiHost(chainId, this.apiUrl)
    if (!apiHost) {
      throw new ValidationError(
        errors.chain_not_supported(),
        'CHAIN_NOT_SUPPORTED'
      )
    }
    if (!from) {
      throw new ValidationError(
        errors.argument_not_provided('from', String(from)),
        'FROM_NOT_PROVIDED'
      )
    }

    if (tokenType !== 'ERC721' && !amount) {
      throw new ValidationError(
        errors.argument_not_provided('amount', String(amount)),
        'AMOUNT_NOT_PROVIDED'
      )
    }

    if (!token && tokenType !== 'NATIVE') {
      throw new ValidationError(
        errors.argument_not_provided('token', String(token)),
        'TOKEN_NOT_PROVIDED'
      )
    }

    if (message) {
      if (!signTypedData) {
        throw new ValidationError(
          errors.argument_not_provided('signTypedData', String(signTypedData)),
          'SIGN_TYPED_DATA_NOT_PROVIDED'
        )
      }
    }

    return this._initializeClaimLink({
      token: token as ETokenAddress || configs.nativeTokenAddress,
      expiration: expiration ||  Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 15),
      chainId,
      amount: amount || '1',
      sender: from.toLowerCase(),
      apiUrl: apiHost,
      apiKey: this.#apiKey,
      tokenType,
      baseUrl: this.baseUrl,
      tokenId,
      source: 'p2p',
      deployment: this.deployment,
      wallet: null,
      claimingFinishedDescription: null,
      claimingFinishedButtonTitle: null,
      claimingFinishedButtonURL: null,
      claimingFinishedButtonOn: null,
      claimingFinishedAutoRedirect: null,
      preferredWalletOn: null,
      additionalWalletsOn: null,
      weiAmount: null,
      message,
      signTypedData
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
      throw new ValidationError(
        errors.chain_not_supported(),
        'CHAIN_NOT_SUPPORTED'
      )
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

    const claimLinks: THistoryItem[] = claim_links.map(claimLink => {
      const claimLinkUpdated = {
        ...claimLink,
        transferId: claimLink.transfer_id,
        tokenType: claimLink.token_type,
        chainId: claimLink.chain_id,
        totalAmount: claimLink.total_amount,
        operations: updateOperations(claimLink.operations),
        tokenId: claimLink.token_id,
        feeToken: claimLink.fee_token,
        feeAmount: claimLink.fee_amount,
        createdAt: claimLink.created_at,
        updatedAt: claimLink.updated_at,
        encryptedSenderMessage: claimLink.encrypted_sender_message
      }

      delete claimLinkUpdated.transfer_id
      delete claimLinkUpdated.created_at
      delete claimLinkUpdated.updated_at
      delete claimLinkUpdated.total_amount
      delete claimLinkUpdated.chain_id
      delete claimLinkUpdated.token_type
      delete claimLinkUpdated.token_id
      delete claimLinkUpdated.fee_token
      delete claimLinkUpdated.fee_amount
      delete claimLinkUpdated.encrypted_sender_message

      return claimLinkUpdated
    })

    return {
      claimLinks,
      resultSet: result_set
    }
  }

  getVersionFromEscrowContract: TGetVersionFromEscrowContract = (escrowAddress) => {
    const result = defineVersionByEscrow(escrowAddress)

    if (!result) {
      throw new Error(errors.version_not_found())
    }

    return result
  }

  getLinkSourceFromClaimUrl: TGetLinkSourceFromClaimUrl = (claimUrl) => {
    return getLinkSourceFromClaimUrl(claimUrl)
  }

  getLimits: TGetLimits = async ({
    token, chainId, tokenType
  }) => {
    const apiHost = defineApiHost(chainId, this.apiUrl)
    if (!apiHost) {
      throw new ValidationError(
        errors.chain_not_supported(),
        'CHAIN_NOT_SUPPORTED'
      )
    }

    if (tokenType === 'ERC721' || tokenType === 'ERC1155') {
      throw new ValidationError(
        errors.limits_disabled_for_erc721_or_erc1155(),
        'LIMITS_NOT_AVAILABLE_FOR_ERC721_AND_ERC1155'
      )
    }

    let tokenAddress = token

    if (tokenAddress !== configs.nativeTokenAddress) {
      if (!tokenAddress) {
        throw new ValidationError(
          errors.argument_not_provided('token', String(token)),
          'TOKEN_NOT_PROVIDED'
        )
      }
    }
  
    const limits = await linkApi.getLimits(
      apiHost,
      this.#apiKey,
      tokenAddress,
      tokenType
    )

    return {
      minTransferAmount: limits.min_transfer_amount,
      maxTransferAmount: limits.max_transfer_amount,
      minTransferAmountUSD: limits.min_transfer_amount_usd,
      maxTransferAmountUSD: limits.max_transfer_amount_usd
    }
  }

  _initializeClaimLink: TInitializeClaimLink = async (claimLinkData) => {
    let transferId = claimLinkData.transferId
    let feeAmount = claimLinkData.feeAmount
    let totalAmount = claimLinkData.totalAmount
    let feeAuthorization = claimLinkData.feeAuthorization
    let feeToken = claimLinkData.feeToken

    let pendingTxs = claimLinkData.pendingTxs
    let pendingBlocks = claimLinkData.pendingBlocks
    let pendingTxSubmittedBn = claimLinkData.pendingTxSubmittedBn
    let pendingTxSubmittedAt = claimLinkData.pendingTxSubmittedAt
    let message = claimLinkData.message
    let signTypedData = claimLinkData.signTypedData
    let encryptedSenderMessage = claimLinkData.encryptedSenderMessage
    let senderMessage = claimLinkData.senderMessage
    let keyPair
    if (!transferId) {
      keyPair = await generateKeypair(this.getRandomBytes)
      transferId = keyPair.address
    }

    if (!feeAmount || !totalAmount) {
      const feeData = await this._getCurrentFee(
        claimLinkData.apiUrl,
        claimLinkData.token,
        claimLinkData.tokenType,
        claimLinkData.sender,
        transferId as string,
        claimLinkData.expiration,
        claimLinkData.tokenType === 'ERC721' ? '1' : claimLinkData.amount,
        claimLinkData.tokenId
      )
      feeAmount = feeData.fee_amount
      totalAmount = feeData.total_amount
      feeAuthorization = feeData.fee_authorization
      feeToken = feeData.fee_token

      pendingTxs = feeData.pending_txs
      pendingBlocks = feeData.pending_blocks
      pendingTxSubmittedBn = feeData.pending_tx_submitted_bn
      pendingTxSubmittedAt = feeData.pending_tx_submitted_at

      if (
        claimLinkData.tokenType === 'NATIVE' || claimLinkData.tokenType === 'ERC20'
      ) {
        if (toBigInt(claimLinkData.amount) < toBigInt(feeData.min_transfer_amount)) {
          throw new ValidationError(
            errors.amount_should_be_more_than_minlimit(feeData.min_transfer_amount.toString()),
            'MIN_LIMIT_FAILED'
          )
        }
    
        if (toBigInt(claimLinkData.amount) > toBigInt(feeData.max_transfer_amount)) {
          throw new ValidationError(
            errors.amount_should_be_less_than_maxlimit(feeData.max_transfer_amount.toString()),
            'MAX_LIMIT_FAILED'
          )
        }
      }
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
      totalAmount,
      source: claimLinkData.source,
      pendingTxs,
      pendingTxSubmittedBn,
      pendingTxSubmittedAt,
      pendingBlocks,
      wallet: claimLinkData.wallet,
      claimingFinishedDescription: claimLinkData.claimingFinishedDescription,
      claimingFinishedButtonTitle: claimLinkData.claimingFinishedButtonTitle,
      claimingFinishedButtonURL: claimLinkData.claimingFinishedButtonURL,
      claimingFinishedButtonOn: claimLinkData.claimingFinishedButtonOn,
      claimingFinishedAutoRedirect: claimLinkData.claimingFinishedAutoRedirect,
      preferredWalletOn: claimLinkData.preferredWalletOn,
      additionalWalletsOn: claimLinkData.additionalWalletsOn,
      weiAmount: claimLinkData.claimingFinishedDescription,
      encryptedSenderMessage,
      senderMessage
    })

    if (message) {
      if (signTypedData) {
        await claimLink.addMessage({
          message,
          signTypedData
        })
      } else {
        throw new Error(errors.argument_not_provided(
          'signTypedData',
          String(signTypedData),
        ))
      }
    } 

    return claimLink
  }

  _getCurrentFee: TGetCurrentFee = async (
    apiUrl,
    token,
    tokenType,
    sender,
    transferId,
    expiration,
    amount,
    tokenId
  ) => {
    const result = await linkApi.getFee(
      apiUrl,
      this.#apiKey,
      token,
      sender.toLowerCase(),
      tokenType,
      transferId,
      expiration,
      amount,
      tokenId
    )

    return result
  }

  getClaimLink: TGetClaimLink = async (claimUrl) => {
    const linkSource = this.getLinkSourceFromClaimUrl(claimUrl)
    if (linkSource === 'd') {
      // const claimCode = getClaimCodeFromDashboardLink(claimUrl)    
      // const linkKey = ethers.id(claimCode)
      // const transferId = new ethers.Wallet(linkKey).address

      const transferId = getTransferIdFromDashboardLink(claimUrl)

      const chainId = getChainIdFromDashboardLink(claimUrl)
      const customApiHost = defineDashboardApiHost(claimUrl)
      const { claim_link } = await linkApi.getTransferStatus(
        customApiHost,
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
        escrow,
        token_id,
        status,
        claiming_finished_auto_redirect,
        claiming_finished_button_on,
        claiming_finished_button_title,
        claiming_finished_button_url,
        claiming_finished_description,
        wei_amount,
        wallet,
        preferred_wallet_on,
        additional_wallets_on,
        encrypted_sender_message
      } = claim_link

      const apiHost = defineApiHost(chainId, this.apiUrl)

      if (!apiHost) {
        throw new ValidationError(
          errors.chain_not_supported(),
          'CHAIN_NOT_SUPPORTED'
        )
      }
  
      const claimLinkData = {
        token: token as ETokenAddress,
        expiration,
        chainId,
        feeAmount: fee_amount,
        feeToken: fee_token,
        totalAmount: total_amount as string,
        amount,
        sender,
        apiUrl: customApiHost,
        apiKey: this.#apiKey,
        transferId: transferId.toLowerCase(),
        claimUrl,
        tokenId: token_id,
        operations: updateOperations(operations),
        tokenType: (token_type as TTokenType),
        baseUrl: this.baseUrl,
        escrowAddress: escrow,
        forRecipient: true,
        status,
        source: linkSource,
        deployment: this.deployment,
        wallet,
        claimingFinishedDescription: claiming_finished_description,
        claimingFinishedButtonTitle: claiming_finished_button_title,
        claimingFinishedButtonURL: claiming_finished_button_url,
        claimingFinishedButtonOn: claiming_finished_button_on,
        claimingFinishedAutoRedirect: claiming_finished_auto_redirect,
        preferredWalletOn: preferred_wallet_on,
        additionalWalletsOn: additional_wallets_on,
        weiAmount: wei_amount,
        encryptedSenderMessage: encrypted_sender_message
      }

      return this._initializeClaimLink(claimLinkData)
    }

    const {
      transferId,
      chainId,
      encryptionKey
    } = decodeLink(claimUrl)

    const version = this.getVersionFromClaimUrl(claimUrl)

    if (version === '2') {
      const linkdropP2P2 = new LinkdropP2PV2.LinkdropP2P({
        baseUrl: this.baseUrl,
        apiKey: String(this.#apiKey)
      })

      return await linkdropP2P2.getClaimLink(claimUrl)
    }

    const apiHost = defineApiHost(chainId, this.apiUrl)

    if (!apiHost) {
      throw new ValidationError(
        errors.chain_not_supported(),
        'CHAIN_NOT_SUPPORTED'
      )
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
      escrow,
      token_id,
      status,
      claiming_finished_auto_redirect,
      claiming_finished_button_on,
      claiming_finished_button_title,
      claiming_finished_button_url,
      claiming_finished_description,
      wei_amount,
      wallet,
      preferred_wallet_on,
      additional_wallets_on,
      encrypted_sender_message
    } = claim_link

    const actualVersion = defineVersionByEscrow(escrow) 

    if (actualVersion === '3') {
      const linkdropP2P3 = new LinkdropP2PV3_11.LinkdropP2P({
        baseUrl: this.baseUrl,
        apiKey: String(this.#apiKey),
        deployment: this.deployment,
        getRandomBytes: this.getRandomBytes
      })

      return await linkdropP2P3.getClaimLink(claimUrl)
    }

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
      tokenId: token_id,
      operations: updateOperations(operations),
      tokenType: (token_type as TTokenType),
      baseUrl: this.baseUrl,
      escrowAddress: escrow,
      forRecipient: true,
      status,
      source: linkSource,
      deployment: this.deployment,
      wallet,
      claimingFinishedDescription: claiming_finished_description,
      claimingFinishedButtonTitle: claiming_finished_button_title,
      claimingFinishedButtonURL: claiming_finished_button_url,
      claimingFinishedButtonOn: claiming_finished_button_on,
      claimingFinishedAutoRedirect: claiming_finished_auto_redirect,
      preferredWalletOn: preferred_wallet_on,
      additionalWalletsOn: additional_wallets_on,
      weiAmount: wei_amount,
      encryptedSenderMessage: encrypted_sender_message,
      senderMessage: (encrypted_sender_message && encryptionKey) ? decryptMessage({
        message: encrypted_sender_message,
        encryptionKey,
        getRandomBytes: this.getRandomBytes
      }) : undefined
    }
    return this._initializeClaimLink(claimLinkData)
  }

  retrieveClaimLink: TRetrieveClaimLink = async ({
    chainId,
    txHash,
    transferId,
    customApiHost
  }) => {
    const apiHost = customApiHost || defineApiHost(chainId, this.apiUrl)
    if (!apiHost) {
      throw new ValidationError(
        errors.chain_not_supported(),
        'CHAIN_NOT_SUPPORTED'
      )
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
        sender,
        status,
        token_id,
        escrow,
        claiming_finished_auto_redirect,
        claiming_finished_button_on,
        claiming_finished_button_title,
        claiming_finished_button_url,
        claiming_finished_description,
        wei_amount,
        wallet,
        preferred_wallet_on,
        additional_wallets_on,
        encrypted_sender_message
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
        totalAmount: total_amount as string,
        status,
        escrowAddress: escrow,
        tokenId: token_id,
        source: (customApiHost ? 'd' : 'p2p') as TClaimLinkSource,
        deployment: this.deployment,
        wallet,
        claimingFinishedDescription: claiming_finished_description,
        claimingFinishedButtonTitle: claiming_finished_button_title,
        claimingFinishedButtonURL: claiming_finished_button_url,
        claimingFinishedButtonOn: claiming_finished_button_on,
        claimingFinishedAutoRedirect: claiming_finished_auto_redirect,
        preferredWalletOn: preferred_wallet_on,
        additionalWalletsOn: additional_wallets_on,
        weiAmount: wei_amount,
        encryptedSenderMessage: encrypted_sender_message
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
        total_amount,
        status,
        token_id,
        escrow,
        claiming_finished_auto_redirect,
        claiming_finished_button_on,
        claiming_finished_button_title,
        claiming_finished_button_url,
        claiming_finished_description,
        wei_amount,
        wallet,
        preferred_wallet_on,
        additional_wallets_on,
        encrypted_sender_message
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
        tokenId: token_id,
        totalAmount: total_amount as string,
        status,
        escrow,
        source: 'p2p' as TClaimLinkSource,
        deployment: this.deployment,
        wallet,
        claimingFinishedDescription: claiming_finished_description,
        claimingFinishedButtonTitle: claiming_finished_button_title,
        claimingFinishedButtonURL: claiming_finished_button_url,
        claimingFinishedButtonOn: claiming_finished_button_on,
        claimingFinishedAutoRedirect: claiming_finished_auto_redirect,
        preferredWalletOn: preferred_wallet_on,
        additionalWalletsOn: additional_wallets_on,
        weiAmount: wei_amount,
        encryptedSenderMessage: encrypted_sender_message
      }

      if (defineVersionByEscrow(escrow) === '2') {
        const linkdropP2P2 = new LinkdropP2PV2.LinkdropP2P({
          baseUrl: this.baseUrl,
          apiKey: String(this.#apiKey),
          getRandomBytes: this.getRandomBytes
        })
  
        return await linkdropP2P2.retrieveClaimLink({
          txHash,
          chainId
        })
      } else if (defineVersionByEscrow(escrow) === '3') {
        const linkdropP2P2 = new LinkdropP2PV3_11.LinkdropP2P({
          baseUrl: this.baseUrl,
          apiKey: String(this.#apiKey),
          getRandomBytes: this.getRandomBytes,
          deployment: this.deployment
        })
  
        return await linkdropP2P2.retrieveClaimLink({
          txHash,
          chainId
        })
      }
      return this._initializeClaimLink(claimLinkData)
    } else {
      throw new ValidationError(
        errors.at_least_one_argument_not_provided(['txHash', 'transferId'])
      )
    }
  }
}

export default LinkdropSDK
