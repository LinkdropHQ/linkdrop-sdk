import { TDomain } from "../domain"

export type TSignTypedData = (
  domain: TDomain,
  types: any,
  message: {
    linkKeyId: string,
    transferId: string
  }
) => Promise<any>
