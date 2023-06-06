import Linkdrop from '../../../linkdrop'

type TArgs = { token: string, sender: string, amount: string }
type TCreateLinkdrop = (args: TArgs) => Linkdrop

export default TCreateLinkdrop