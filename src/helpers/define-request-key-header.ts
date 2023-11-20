type TDefineRequestKeyHeader = (campaignSig: string) => Record<string, string>
const defineRequestKeyHeader: TDefineRequestKeyHeader = (campaignSig) => {
  const headers = {}
  headers[
    'X-CAMPAIGN-KEY'
  ] = campaignSig
  return headers
}

export default defineRequestKeyHeader
