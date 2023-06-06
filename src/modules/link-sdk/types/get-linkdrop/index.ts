import Linkdrop from '../../../linkdrop'

type TArgs = { token: string, sender: string, transferId: string }
type TGetLinkdrop = (args: TArgs) => Linkdrop

export default TGetLinkdrop