import { TClaimLinkItemStatus, TClaimLinkItemOperation } from '../../../../types'

type TGetStatus = () => Promise<{
  status: TClaimLinkItemStatus,
  operations: TClaimLinkItemOperation[]
}>

export default TGetStatus