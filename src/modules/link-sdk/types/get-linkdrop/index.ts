import Linkdrop from '../../../linkdrop'

type TArgs = { token: string, transferId: string }
type TGetLinkdrop = (args: TArgs) => Promise<Linkdrop>

export default TGetLinkdrop