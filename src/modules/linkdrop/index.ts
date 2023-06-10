import ILinkdrop, { TInitialize, TGetNextTransferId, TGetDepositAmount, TGenerateLink } from './types'
import { getDepositAuthorization, getValidAfterAndValidBefore, generateLinkKeyandSignature } from "../../utils"
import { ethers } from 'ethers'
import { TDomain, TEscrowPaymentDomain, TLink } from '../../types'
import { linkApi } from '../../api'
import { encodeLink } from '../../helpers'
import { claimHost } from '../../configs'

class Linkdrop implements ILinkdrop {
    sender: string
    token: string
    transferId?: string
    amount?: string
    expiration?: number
    signer?: ethers.Signer
    escrow?: ethers.Contract
    chainId: number
    apiHost: string

    constructor({
      token,
      transferId,
      amount,
      expiration,
      options = {}
    }: {
      token: string
      transferId?: string
      amount?: string,
      expiration?: number,
      options?: {
        signer?: ethers.Signer,
        escrow?: ethers.Contract,
        apiHost?: string
      }
    }) {
      this.transferId = transferId
      this.amount = amount
      this.token = token
      this.expiration = expiration
      this.signer = options.signer
      this.escrow = options.escrow
    }

    initialize: TInitialize = async () => {
      if (!this.transferId) {
        const transferId = await this._getNextTransferId()
        if (transferId) {
            this.transferId = transferId
        }
      }
      if (!this.amount) {
        const amount = await this.getDepositAmount()
        if (amount) {
            this.amount = amount
        }
      }

      if (!this.sender && this.signer) {
        const sender = await this.signer.getAddress();
        if (sender) {
          this.sender = sender
        }
      }

      if (!this.chainId && this.signer) {
        const chainId = await this.signer.getChainId()
        if (chainId) {
            this.chainId = chainId
        }
      }
    }

    _getNextTransferId: TGetNextTransferId = async () => {
      return String(+new Date())
    }

    getDepositAmount: TGetDepositAmount = async () => {
      return String(+new Date())
    }

    depositWithAuthorization = async () => {
      const domain: TDomain = {
        name: 'USD Coin (PoS)',
        version: '1',
        verifyingContract: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881'
      }

      const [validAfter, validBefore] = getValidAfterAndValidBefore()
      if (!this.escrow) {
        return alert('escrow contract not provided')
      }
      if (!this.transferId) {
        return alert('transferId not provided')
      }
      if (!this.expiration) {
        return alert('expiration not provided')
      }
      if (!this.amount) {
        return alert('amount not provided')
      }
      if (!this.signer) {
        return alert('signer not provided')
      }
      const auth = await getDepositAuthorization(
        this.signer,
        this.escrow.address,
        this.amount,
        validAfter,
        validBefore,
        this.transferId,
        this.expiration,
        domain
      )
      if (auth) {
        const redeem = await linkApi.deposit(
          this.apiHost,
          this.sender,
          this.escrow.address,
          this.transferId,
          this.expiration,
          this.amount,
          auth
        )
        const { data } = redeem
        return data
      }
    }

    generateLink: TGenerateLink = async () => {
      if (!this.escrow) {
        return alert('escrow contract not provided')
      }
      if (!this.sender) {
        return alert('sender not provided')
      }
      if (!this.signer) {
        return alert('signer not provided')
      }
      if (!this.transferId) {
        return alert('transferId not provided')
      }
      const escrowPaymentDomain: TEscrowPaymentDomain = {
        name: "LinkdropEscrow",
        version: "1",
        chainId: this.chainId, // Replace with your actual chainid
        verifyingContract: this.escrow.address,
      }
      const result = await generateLinkKeyandSignature(this.signer, this.transferId, escrowPaymentDomain)
      if (result) {
        const { linkKey, linkKeyId, senderSig } = result
        const linkParams: TLink = {
          linkKey,
          linkKeyId,
          senderSig,
          transferId: this.transferId,
          sender: this.sender
        }

        return encodeLink(claimHost, linkParams)
      }
      
    }
}

export default Linkdrop
