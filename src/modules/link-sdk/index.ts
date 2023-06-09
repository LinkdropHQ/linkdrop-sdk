import { Signer, ethers } from 'ethers'
import ILinkSDK, { TCreateLinkdrop, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop } from './types'
import Linkdrop from '../linkdrop'
import axios from 'axios'

class LinkSDK implements ILinkSDK {
    apiKey: string
    signer: Signer
    escrow: any

    constructor(
        apiKey: string,
        signer: Signer
    ) {
        this.apiKey = apiKey
        this.signer = signer

        const ABI = ["function getDeposit(address sender_, uint256 transferId_) view returns (uint128 amount, uint128 expiration)"]
        const escrowAddr = "0x89C0123826AD31f0BcE61d6f28Bd2175F46e8b74"
        this.escrow = new ethers.Contract(escrowAddr, ABI, this.signer);
    }

    getLinkdrop: TGetLinkdrop = ({ token, transferId }) => {
        return new Linkdrop({ token, transferId })
    }

    createLinkdrop: TCreateLinkdrop = async ({ token, amount, expiration }) => {
        const options = { signer: this.signer, escrow: this.escrow }
        const linkdrop = new Linkdrop({ token, amount, expiration, options })
        await linkdrop.initialize()
        return linkdrop
    }

    fetchHistory: TFetchHistory = async ({ sender, token }) => {
        const linkdrops = await axios.get('')
        return linkdrops
    }

    getCurrentFee: TGetCurrentFee = async (token) => {
        return '0'
    }

    getDepositAmount: TGetDepositAmount = async (link) => {
        // todo
        const transferId = "1345678"
        const sender = "0x4D0714544Ede1BE9bc39d73846B0fF2233DE79c8"
        const { amount, expiration } = await this.escrow.getDeposit(sender, transferId)
        return amount
    }
}

export default LinkSDK
