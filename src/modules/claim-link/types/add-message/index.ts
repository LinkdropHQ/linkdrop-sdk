import { TSignTypedData } from "../../../../types"

type TAddMessage = ({
  message,
  signTypedData
}: {
  message: string,
  signTypedData: TSignTypedData
}) => Promise<void>

export default TAddMessage