import { parseQueryParams } from "../../helpers"
import { expect} from "chai"

const queryParams1 = 'lol=wow&rofl=true'
const result1 = {
  lol: 'wow',
  rofl: 'true'
}

const queryParams2 = 'lol=wow'
const result2 = {
  lol: 'wow'
}

describe("parseQueryParams", () => {
  it("should return { lol: 'wow'; rofl: 'true' }", () => {
    const result = parseQueryParams(queryParams1)
    expect(result1).to.deep.equal(result)
  })

  it("should return { lol: 'wow' }", () => {
    const result = parseQueryParams(queryParams2)
    expect(result2).to.deep.equal(result)
  })
})