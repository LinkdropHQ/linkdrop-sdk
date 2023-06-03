import ILink from "../../link"

export type TInitializeLink = ({ tokenAddress, tokenId, tokenAmount }: { tokenAddress: string, tokenId?: string, tokenAmount?: string }) => Promise<ILink>