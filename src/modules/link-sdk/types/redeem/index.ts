type TRedeem= (link: string, to: string) => Promise<{success: boolean, data: { tx_hash: string }}>

export default TRedeem