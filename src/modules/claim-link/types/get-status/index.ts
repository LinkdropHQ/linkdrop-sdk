import { TClaimLinkItemStatus, TClaimLinkItemOperation } from '../../../../types'

type TGetStatus = () => Promise<{
  status: TClaimLinkItemStatus,
  operations: TClaimLinkItemOperation[]
} | void>

export default TGetStatus