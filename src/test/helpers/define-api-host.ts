import { defineApiHost } from "../../helpers"
import { apiUrl } from '../../configs/index'
import { expect } from "chai"

describe("defineApiHost", () => {
  it("should return polygon api url", () => {
    const result = defineApiHost(137, null)
    expect(`${apiUrl}/polygon`).to.equal(result)
  })
  it("should return null api url as default", () => {
    const result = defineApiHost(666, null)
    expect(null).to.equal(result)
  })
})