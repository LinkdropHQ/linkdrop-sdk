import { TSignTypedData } from "../../../../types"

type TRedeemAndRegisterStealthKeys = (
  dest:string,
  derivationSignature: null | undefined | string,
  signTypedData: TSignTypedData
) => Promise<void>

export default TRedeemAndRegisterStealthKeys
 