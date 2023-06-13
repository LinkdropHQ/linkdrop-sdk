import { TLink } from "../../../../types"

type TRedeem= (link: string, to: string) => Promise<{transferId: string, success: boolean, txHash: string }>

export default TRedeem