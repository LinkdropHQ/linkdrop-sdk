//const getRandomBytes = (length) => { 
//	return new Uint8Array(crypto.randomBytes(length));
//}

export type TGetRandomBytes = (
  length: number
) => Promise<Uint8Array>
