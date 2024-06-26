import { IBatch, TBatchItem, TLinkItem, TCampaignItem } from '../../types'
import TAddLinks from '../../types/modules/batch/add-links'
import TGetLinks from '../../types/modules/batch/get-links'
import { crypto } from '../../utils'
import { prepareAssets } from '../../helpers'
import { batchesApi } from '../../api'

class Batch implements IBatch {
  data: TBatchItem
  batchId: string
  claimLinks?: TLinkItem[]
  campaignSig: string
  encryptionKey: string
  apiHost: string
  claimHostUrl: string
  campaignData: TCampaignItem
  signerKey: string
  apiKey: string
  chainId: number

  constructor (
    batchId: string,
    data: TBatchItem,
    claimLinks: TLinkItem[],
    encryptionKey: string,
    claimHostUrl: string,
    campaignData: TCampaignItem,
    signerKey: string,
    campaignSig: string,
    apiHost: string,
    apiKey: string,
    chainId: number
  ) {
    this.batchId = batchId
    this.data = data
    this.claimLinks = claimLinks
    this.campaignSig = campaignSig
    this.encryptionKey = encryptionKey
    this.apiHost = apiHost
    this.claimHostUrl = claimHostUrl
    this.campaignData = campaignData
    this.signerKey = signerKey
    this.apiKey = apiKey
    this.chainId = chainId
  }

  addLinks: TAddLinks = async (
    assets,
    {
      shortCodeLength,
      shortCodeMixRegister,
      expirationTime
    } = {
      shortCodeLength: 12,
      shortCodeMixRegister: true,
      expirationTime: '1900000000000'
    }
  ) => {
    const transformedAssets = await prepareAssets(
      assets,
      this.signerKey,
      this.encryptionKey,
      this.campaignData.token_standard,
      this.campaignData.token_address,
      this.campaignData.proxy_contract_address,
      this.campaignData.chain_id,
      this.campaignData.proxy_contract_version,
      expirationTime,
      shortCodeLength,
      shortCodeMixRegister
    )
    if (!transformedAssets) { return alert('Error with assets') }
    return await batchesApi.addLinks(
      this.apiHost,
      this.apiKey,
      this.campaignSig,
      this.campaignData.campaign_id,
      this.batchId,
      transformedAssets
    )
  }

  getLinks: TGetLinks = (
    linkPattern
  ) => {
    if (!this.claimLinks) {
      return []
    }
    return this.claimLinks.map(link => {
      const encryptedClaimCode = link.encrypted_claim_code
      const claimCode = crypto.decrypt(encryptedClaimCode, this.encryptionKey)

      let finalLink = `${this.claimHostUrl}/#/redeem/${claimCode}`
      if (linkPattern) {
        finalLink = linkPattern.replace('<CODE>', claimCode)
          .replace('<CHAIN_ID>', String(this.chainId))
      }
      const sourceParam = finalLink.includes('?') ? `&src=d` : '?src=d'
      return {
        linkId: link.link_id,
        claimCode,
        claimLink: `${finalLink}${sourceParam}`
      }
    })
  }
}

export default Batch