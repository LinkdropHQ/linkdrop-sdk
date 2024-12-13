import { ChaCha20Poly1305 } from "@stablelib/chacha20poly1305"
import { concat, fromString, toString } from "uint8arrays"

export const BASE10 = "base10";
export const BASE16 = "base16";
export const BASE64 = "base64pad";
export const BASE64URL = "base64url";
export const UTF8 = "utf8";
export const TYPE_0 = 0;
export const TYPE_1 = 1;
export const TYPE_2 = 2;
const ZERO_INDEX = 0;
const TYPE_LENGTH = 1;
const IV_LENGTH = 12;
const KEY_LENGTH = 32;

export function encodeTypeByte(type: number): Uint8Array {
  return fromString(`${type}`, BASE10);
}

export function decodeTypeByte(byte: Uint8Array): number {
  return Number(toString(byte, BASE10));
}

export function decrypt(params: any): string {
  const box = new ChaCha20Poly1305(fromString(params.symKey, BASE16));
  const { sealed, iv } = deserialize({
    encoded: params.encoded,
    randomBytes: params.randomBytes,
    encoding: params?.encoding
  });
  const message = box.open(iv, sealed);
  if (message === null) throw new Error("Failed to decrypt");
  return toString(message, UTF8);
}


export function encrypt(params: any): string {
  const type = encodeTypeByte(typeof params.type !== "undefined" ? params.type : TYPE_0);
  if (decodeTypeByte(type) === TYPE_1 && typeof params.senderPublicKey === "undefined") {
    throw new Error("Missing sender public key for type 1 envelope");
  }
  const senderPublicKey =
    typeof params.senderPublicKey !== "undefined"
      ? fromString(params.senderPublicKey, BASE16)
      : undefined;

  const iv =
    typeof params.iv !== "undefined" ? fromString(params.iv, BASE16) : params.randomBytes(IV_LENGTH);
  const box = new ChaCha20Poly1305(fromString(params.symKey, BASE16));
  const sealed = box.seal(iv, fromString(params.message, UTF8));
  return serialize({ type, sealed, iv, senderPublicKey, encoding: params.encoding });
}

export function serialize(params: any): string {
  const { encoding = BASE64 } = params;

  if (decodeTypeByte(params.type) === TYPE_2) {
    return toString(concat([params.type, params.sealed]), encoding);
  }
  if (decodeTypeByte(params.type) === TYPE_1) {
    if (typeof params.senderPublicKey === "undefined") {
      throw new Error("Missing sender public key for type 1 envelope");
    }
    return toString(
      concat([params.type, params.senderPublicKey, params.iv, params.sealed]),
      encoding,
    );
  }
  // default to type 0 envelope
  return toString(concat([params.type, params.iv, params.sealed]), encoding);
}

export function deserialize(params: any): any {
  const { encoded, encoding = BASE64 } = params;
  const bytes = fromString(encoded, encoding);
  const type = bytes.slice(ZERO_INDEX, TYPE_LENGTH);
  const slice1 = TYPE_LENGTH;
  if (decodeTypeByte(type) === TYPE_1) {
    const slice2 = slice1 + KEY_LENGTH;
    const slice3 = slice2 + IV_LENGTH;
    const senderPublicKey = bytes.slice(slice1, slice2);
    const iv = bytes.slice(slice2, slice3);
    const sealed = bytes.slice(slice3);
    return { type, sealed, iv, senderPublicKey };
  }
  if (decodeTypeByte(type) === TYPE_2) {
    const sealed = bytes.slice(slice1);
    // iv is not used in type 2 envelopes
    const iv = params.randomBytes(IV_LENGTH);
    return { type, sealed, iv };
  }
  // default to type 0 envelope
  const slice2 = slice1 + IV_LENGTH;
  const iv = bytes.slice(slice1, slice2);
  const sealed = bytes.slice(slice2);
  return { type, sealed, iv };
}