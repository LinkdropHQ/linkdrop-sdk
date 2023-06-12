import { ethers } from 'ethers'
import { getNonce } from '..'
import { TDomain, TSignerCustomized } from '../../types'

async function getDepositAuthorization(
    signer: TSignerCustomized,
    to: string,
    amount: string,
    validAfter: number,
    validBefore: number,
    transferId: string,
    expiration: string,
    domain: TDomain
) {
    // The EIP-712 type data
    const types = {
        TransferWithAuthorization: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'validAfter', type: 'uint256' },
            { name: 'validBefore', type: 'uint256' },
            { name: 'nonce', type: 'bytes32' },
        ],
    }
    const sender = await signer.getAddress()
    const nonce = getNonce(sender, transferId, amount, expiration)
    const message = {
        from: sender,
        to,
        value: amount,
        validAfter,
        validBefore,
        nonce
    }

    if (signer._signTypedData) {
        const signature = await signer._signTypedData(domain, types, message)
        const signatureSplit = ethers.utils.splitSignature(signature)

        // Encode the authorization
        const authorization = ethers.utils.defaultAbiCoder.encode(
            ['address', 'address', 'uint256', 'uint256', 'uint256', 'bytes32', 'uint8', 'bytes32', 'bytes32'],
            [message.from, message.to, message.value, message.validAfter, message.validBefore, message.nonce, signatureSplit.v, signatureSplit.r, signatureSplit.s]
        )

        return authorization
    }

}

export default getDepositAuthorization
