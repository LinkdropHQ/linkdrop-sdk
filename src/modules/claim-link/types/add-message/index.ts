import { TSignTypedData } from "../../../../types"

type TAddMessage = ({
  message,
  signTypedData,
  encryptionKeyLength
}: {
  message: string,
  signTypedData: TSignTypedData,
  encryptionKeyLength?: number
}) => Promise<void>

export default TAddMessage