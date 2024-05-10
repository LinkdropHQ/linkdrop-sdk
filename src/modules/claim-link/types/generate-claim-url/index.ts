import { TSignTypedData, TGetRandomBytes } from "../../../../types"

type TGenerateClaimUrlArgs = {
  signTypedData: TSignTypedData
}

type TGenerateClaimUrl = ({
  signTypedData
}: TGenerateClaimUrlArgs) => Promise<{
  claimUrl: string,
  transferId: string
}>

export default TGenerateClaimUrl