const convertBase58ToUint8Array = (base58: string): Uint8Array => {
  const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  let result = [0];

  for (let i = 0; i < base58.length; i++) {
      const value = BASE58_ALPHABET.indexOf(base58[i]);
      if (value === -1) throw new Error('Invalid Base58 character');

      let carry = value;
      for (let j = 0; j < result.length; j++) {
          carry += result[j] * 58;
          result[j] = carry % 256;
          carry = Math.floor(carry / 256);
      }

      while (carry > 0) {
          result.push(carry % 256);
          carry = Math.floor(carry / 256);
      }
  }

  // Handle leading zeroes
  for (let i = 0; i < base58.length && base58[i] === '1'; i++) {
      result.push(0);
  }

  return Uint8Array.from(result.reverse());
}

export default convertBase58ToUint8Array