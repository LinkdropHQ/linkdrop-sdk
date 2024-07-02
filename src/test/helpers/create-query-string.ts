import { createQueryString } from "../../helpers"
import { expect} from "chai"

const data = {
  lol: 'wow',
  rofl: true
}

const dataSingle = {
  lol: 'wow'
}

describe("createQueryString", () => {
  it("should return lol=wow&rofl=true string", () => {
    const result = createQueryString(data)
    expect(`lol=wow&rofl=true`).to.equal(result)
  })

  it("should return lol=wow", () => {
    const result = createQueryString(dataSingle)
    expect(`lol=wow`).to.equal(result)
  })

})