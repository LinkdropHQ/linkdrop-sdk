import ILinkdrop, { TInitialize, TGetNextTransferId, TGetDepositAmount } from './types'
import { getAuthorization, getValidAfterAndValidBefore } from "../../utils/get-deposit-authorization"
import { generateLinkKeyandSignature } from "../../utils/payment-link-utils"
import { ethers } from 'ethers'
import { linkApi } from '../../api'

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
      const domain = {
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
      const auth = await getAuthorization(this.signer, this.escrow.address, this.amount, validAfter, validBefore, this.transferId, this.expiration, domain)
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

      // POST https://mumbai.escrow-payment-api.linkdrop.io/api/v1/escrow-payments/deposit
      // example params
      // { 
      //     "sender": "0x4D0714544Ede1BE9bc39d73846B0fF2233DE79c8", // this.signer.address
      //     "escrow": "0x89C0123826AD31f0BcE61d6f28Bd2175F46e8b74", // this.escrow.address
      //     "transfer_id": "1686297255600",
      //     "expiration": "1686383655",
      //     "amount": "10000000", 
      //     "authorization": "0x0000000000000000000000004d0714544ede1be9bc39d73846b0ff2233de79c800000000000000000000000089c0123826ad31f0bce61d6f28bd2175f46e8b740000000000000000000000000000000000000000000000000000000000989680000000000000000000000000000000000000000000000000000000006482cc970000000000000000000000000000000000000000000000000000000064842c271997c4e69441a3cfdf2f20a8c7a0369715edba9a80665321280fa4e1af151a68000000000000000000000000000000000000000000000000000000000000001c6ab04d912de3dd3aedda8415d67a2055c6353044935643a4a89d9b483a7e7e7d63cbb98d1053f3a5d2da62036550dc033e2bd1b83dcf9081a1909219b32b9e0b"
      // }
      return "tx hash"
    }

    generateLink = async () => {
      if (!this.escrow) {
        return alert('escrow contract not provided')
      }
      if (!this.sender) {
        return alert('sender not provided')
      }
      const escroPaymentDomain = {
        name: "LinkdropEscrow",
        version: "1",
        chainId: this.chainId, // Replace with your actual chainid
        verifyingContract: this.escrow.address,
      }
      const { linkKey, linkKeyId, senderSig } = await generateLinkKeyandSignature(this.signer, this.transferId, escroPaymentDomain)
      return {
        linkKey,
        linkKeyId,
        senderSig,
        transferId: this.transferId,
        sender: this.sender
      }
    }
}

export default Linkdrop
