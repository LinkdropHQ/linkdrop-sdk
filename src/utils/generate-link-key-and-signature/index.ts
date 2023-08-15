import generateKeyPair from '../generate-keypair'
import { ethers } from 'ethers'
import { TEscrowPaymentDomain, TSignerCustomized } from '../../types'

const generateLinkKeyandSignature = async (
    sender: TSignerCustomized,
    transferId: string,
    domain: TEscrowPaymentDomain
) => {

    // Generate a new private key
    const { privateKey } = generateKeyPair()
    const linkKey = new ethers.Wallet(privateKey)

    // Create the data to sign
    const types = {
        Transfer: [
            { name: 'linkKeyId', type: 'address' },
            { name: 'transferId', type: 'uint256' }
        ]
    }
    const message = {
        linkKeyId: linkKey.address,
        transferId: transferId
    }
    if (sender._signTypedData) {
        const senderSig = await sender._signTypedData(domain, types, message);
        return { linkKey: linkKey.privateKey, linkKeyId: linkKey.address, senderSig }
    }

}

export default generateLinkKeyandSignature
