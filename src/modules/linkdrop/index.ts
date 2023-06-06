import ILinkdrop, { TInitialize, TGetNextTransferId, TGetDepositAmount } from './types'

class Linkdrop implements ILinkdrop {
  token: string
  sender: string
  transferId?: string
  amount?: string

  constructor ({
    sender,
    token,
    transferId,
    amount
  }: {
    token: string
    sender: string
    transferId?: string
    amount?: string
  }) {
    this.transferId = transferId
    this.sender = sender
    this.amount = amount
    this.token = token
  }

  initialize: TInitialize = async () => {
    if (!this.transferId) { 
      const transferId = await this._getNextTransferId()
      if (transferId) {
        this.transferId = transferId
      }
    } 
    if (!this.token) { 
      const amount = await this.getDepositAmount()
      if (amount) {
        this.amount = amount
      }
    }
  }

  _getNextTransferId: TGetNextTransferId  = async () => {
    return String(+new Date())
  }

  getDepositAmount: TGetDepositAmount = async () => {
    return String(+new Date())
  }
}

export default Linkdrop