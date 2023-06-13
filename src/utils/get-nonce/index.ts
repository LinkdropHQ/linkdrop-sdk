import { ethers } from 'ethers'

const getNonce = (
    from: string,
    transferId: string,
    amount: string,
    expiration: string
) => {
    return ethers.utils.solidityKeccak256(
        ['address', 'uint256', 'uint256', 'uint128'],
        [from, transferId, amount, expiration]
    )
}

export default getNonce
