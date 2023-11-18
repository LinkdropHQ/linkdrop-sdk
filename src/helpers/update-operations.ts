import { TClaimLinkItemOperation } from "../types"

type TUpdateOperations = (operations: TClaimLinkItemOperation[]) => TClaimLinkItemOperation[]

const updateOperations: TUpdateOperations = (operations) => {
  const operationsUpdated = operations.map(operation => {
    const operationUpdated = {
      ...operation,
      txHash: operation.tx_hash,
    }

    delete operationUpdated.tx_hash
    return operationUpdated
  })
  return operationsUpdated
}

export default updateOperations