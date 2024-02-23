import escrows from '../configs/escrows'

type TDefineVersionByEscrow = (
  escrowAddress: string
) => string | undefined

const defineVersionByEscrow: TDefineVersionByEscrow = (
  escrowAddress
) => {
  const escrowVersions = Object.keys(escrows)
  const result = escrowVersions.find(version => {
    const escrowsForVersion = escrows[version]
    if (escrowsForVersion && escrowsForVersion.length > 0) {
      return escrowsForVersion.find(item => item.toLowerCase() === escrowAddress.toLowerCase())
    }
  })

  return result
}

export default defineVersionByEscrow