import Linkdrop from '../../../linkdrop'

type TArgs = { token: string, sender: string, transferId: string }
type TGetLinkdrop = (args: TArgs) => Promise<Linkdrop>

export default TGetLinkdrop