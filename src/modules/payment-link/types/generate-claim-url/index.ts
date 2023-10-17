import { TSignTypedData, TGetRandomBytes } from "../../../../types"

type TGenerateClaimUrlArgs = {
  signTypedData: TSignTypedData
  getRandomBytes: TGetRandomBytes
}

type TGenerateClaimUrl = ({
  signTypedData,
  getRandomBytes 
}: TGenerateClaimUrlArgs) => Promise<{
  claimUrl: string,
  transferId: string
} | void>

export default TGenerateClaimUrl