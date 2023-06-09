import Linkdrop from '../../../linkdrop'

type TArgs = { token: string, amount: string, expiration: number }
type TCreateLinkdrop = (args: TArgs) => Promise<Linkdrop>

export default TCreateLinkdrop
