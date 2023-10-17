import { TDomain } from "../domain"

export type TSignTypedData = (
  domain: TDomain,
  types: any,
  message: Record<string, string | number>
) => Promise<any>
