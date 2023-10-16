
// ok for now, should be changed
type TParseUrl = (link: string) => Promise<{
    senderSig: string,
    linkKey: string,
    transferId: string,
    sender: string
}>

export default TParseUrl
