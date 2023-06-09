import { Signer, ethers } from 'ethers'
import ILinkSDK, { TCreateLinkdrop, TFetchHistory, TGetCurrentFee, TGetDepositAmount, TGetLinkdrop } from './types'
import Linkdrop from '../linkdrop'
import { generateReceiverSig } from "./../../utils/payment-link-utils"
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

    redeem = async (link, to) => {
        const { senderSig, linkKey, transferId, sender } = this._parseUrl(link)

        const receiverSig = await generateReceiverSig(linkKey, to)
        console.log("---------------")
        console.log({
            escrow: this.escrow.address,
            reciever: to,
            sender,
            transfer_id: transferId,
            receiver_sig: receiverSig,
            sender_sig: senderSig
        })


        // 2. send params to backend 
        // POST https://mumbai.escrow-payment-api.linkdrop.io/api/v1/escrow-payments/redeem
        // example params
        // {
        //     "escrow": "0x89C0123826AD31f0BcE61d6f28Bd2175F46e8b74",
        //     "receiver": "0x4d0714544ede1be9bc39d73846b0ff2233de79c8",
        //     "sender": "0x4D0714544Ede1BE9bc39d73846B0fF2233DE79c8",
        //     "transfer_id": "1686305676410",
        //     "receiver_sig": "0x587c29a74b97cc70f82855899201ac4f6fdac4f185caf21fcc962c793af8b0e64629896733188f5164b2411319f7e455a1709dc40157e36fac392c92adbf117b1c",
        //     "sender_sig": "0xc07c8578b625f4676405683f0580aac148caf936c88b2b9c2d319d07a426b3655239d3d8d12ed56ca46a004cfe1ce14d7002a2cab4ef8cc9bb45363c0b9787901c"
        // }
        return "redeem_tx_hash"
    }

    _parseUrl(link) {
        const { senderSig, linkKey, transferId, sender } = link
        return { senderSig, linkKey, transferId, sender }
    }
}

export default LinkSDK
