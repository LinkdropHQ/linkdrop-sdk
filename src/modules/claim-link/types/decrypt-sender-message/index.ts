import { TSignTypedData } from "../../../../types"

type TDecryptSenderMessage = ({
  signTypedData
}: {
  signTypedData: TSignTypedData
}) => Promise<string>

export default TDecryptSenderMessage