import nacl from 'tweetnacl';
import { toUtf8Bytes, toUtf8String } from 'ethers'; // Ethers v6 for UTF-8 conversion

const NONCE_LENGTH = 24;
const KEY_LENGTH = 32;
const TYPE_0 = 0;
const TYPE_LENGTH = 1;
const ZERO_INDEX = 0;

/**
 * Converts Uint8Array to a hex string.
 */
function toHex(uint8Array: Uint8Array): string {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts a hex string to Uint8Array.
 */
function fromHex(hex: string): Uint8Array {
  const length = hex.length;
  const arr = new Uint8Array(length / 2);
  for (let i = 0; i < length; i += 2) {
    arr[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return arr;
}

/**
 * Encodes the type as a single byte Uint8Array.
 */
function encodeTypeByte(type: number): Uint8Array {
  return new Uint8Array([type]);
}

/**
 * Decodes the type byte back to a number.
 */
function decodeTypeByte(byte: Uint8Array): number {
  return byte[0];
}

/**
 * Encrypts a message using nacl.secretbox with TYPE_0 format:
 * [type(1 byte), iv(24 bytes), sealed(...)] -> Hex encoded.
 */
interface EncryptParams {
  symKey: string;                  // 32-byte hex string
  message: string;                 // Plaintext message
  iv?: string;                     // Optional 24-byte hex nonce
  randomBytes: (size: number) => Uint8Array;
}

export function encrypt(params: EncryptParams): string {
  const type = encodeTypeByte(TYPE_0);
  const key = fromHex(params.symKey);

  if (key.length !== KEY_LENGTH) {
    throw new Error("Key must be 32 bytes (in hex).");
  }

  const iv = typeof params.iv !== "undefined"
    ? fromHex(params.iv)
    : params.randomBytes(NONCE_LENGTH);

  if (iv.length !== NONCE_LENGTH) {
    throw new Error("IV must be 24 bytes.");
  }

  const messageBytes = toUtf8Bytes(params.message); // Use ethers v6 utility
  const sealed = nacl.secretbox(messageBytes, iv, key);

  // Combine [type(1), iv(24), sealed(...)]
  const combined = new Uint8Array([...type, ...iv, ...sealed]);
  return toHex(combined);
}

/**
 * Decrypts a hex-encoded message using nacl.secretbox with TYPE_0 format.
 * Expects [type(1 byte), iv(24 bytes), sealed(...)].
 */
interface DecryptParams {
  symKey: string;                  // 32-byte hex string
  encoded: string;                 // Hex-encoded encrypted message
}

export function decrypt(params: DecryptParams): string {
  const key = fromHex(params.symKey);

  if (key.length !== KEY_LENGTH) {
    throw new Error("Key must be 32 bytes (in hex).");
  }

  const bytes = fromHex(params.encoded);
  const type = bytes.slice(ZERO_INDEX, TYPE_LENGTH);

  if (decodeTypeByte(type) !== TYPE_0) {
    throw new Error("Invalid type byte, expected TYPE_0.");
  }

  const slice1 = TYPE_LENGTH;
  const slice2 = slice1 + NONCE_LENGTH;
  const iv = bytes.slice(slice1, slice2);

  if (iv.length !== NONCE_LENGTH) {
    throw new Error("Invalid IV length.");
  }

  const sealed = bytes.slice(slice2);
  const message = nacl.secretbox.open(sealed, iv, key);

  if (!message) {
    throw new Error("Failed to decrypt");
  }

  return toUtf8String(message); // Use ethers v6 utility
}
