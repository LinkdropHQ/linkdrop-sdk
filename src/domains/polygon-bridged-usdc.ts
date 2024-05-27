import { ETokenAddress } from "../types"

const polygonUSDCBridged = {
  name: 'USD Coin (PoS)',  // Polygon Mainnet
  version: '1',
  verifyingContract: ETokenAddress.usdcBridgedPolygon,
  salt: '0x0000000000000000000000000000000000000000000000000000000000000089'
}

export default polygonUSDCBridged