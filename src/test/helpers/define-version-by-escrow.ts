import getVersionByEscrow from "../../helpers/define-version-by-escrow"
import { expect} from "chai"

const escrowV1 = '0x0522dd6e9f2beca1cd15a5fd275dc279a1a08eac'
const escrowV2 = '0xad27383460183fd7e21b71df3b4cac9480eb9a75'
const escrowV3 = '0x0b962bbbf101941d0d0ec1041d01668dac36647a'
const escrowV3_1 = '0x88d51990a3b962f975846f3688e36d2a1fc611f1'

describe("getVersionByEscrow", () => {
  it("should return v1", () => {
    const result = getVersionByEscrow(escrowV1)
    expect(`1`).to.equal(result)
  })
  it("should return v2", () => {
    const result = getVersionByEscrow(escrowV2)
    expect(`2`).to.equal(result)
  })
  it("should return v3", () => {
    const result = getVersionByEscrow(escrowV3)
    expect(`3`).to.equal(result)
  })
  it("should return v3.1", () => {
    const result = getVersionByEscrow(escrowV3_1)
    expect(`3.1`).to.equal(result)
  })
})