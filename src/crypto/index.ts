import nacl from "tweetnacl";
import base64js from "base64-js";

// Polyfill TextEncoder and TextDecoder for React Native
import { TextEncoder, TextDecoder } from 'text-encoding';

export const BASE10 = "base10";
export const BASE16 = "hex";
export const BASE64 = "base64";
export const BASE64URL = "base64url";
export const UTF8 = "utf8";
export const TYPE_0 = 0;
export const TYPE_1 = 1;
export const TYPE_2 = 2;
const ZERO_INDEX = 0;
const TYPE_LENGTH = 1;
const IV_LENGTH = 24;
const KEY_LENGTH = 32;

function toUtf8(string) {
  const encoder = new TextEncoder();
  return encoder.encode(string);
}

function fromUtf8(bytes) {
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

function toHex(uint8Array) {
  return Array.from(uint8Array).map((byte: number) => byte.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex) {
  const len = hex.length;
  const arr = new Uint8Array(len / 2);
  for (let i = 0; i < len; i += 2) {
    arr[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return arr;
}

function toBase64(uint8Array) {
  return base64js.fromByteArray(uint8Array);
}

function fromBase64(base64) {
  return base64js.toByteArray(base64);

}

export function encodeTypeByte(type) {
  return toUtf8(`${type}`);
}

export function decodeTypeByte(byte) {
  return Number(fromUtf8(byte));
}

export function decrypt(params) {
  const key = fromHex(params.symKey);
  const { sealed, iv } = deserialize({
    encoded: params.encoded,
    randomBytes: params.randomBytes,
    encoding: params?.encoding,
  });

  const message = nacl.secretbox.open(sealed, iv, key);
  if (!message) throw new Error("Failed to decrypt");
  return fromUtf8(message);
}

export function encrypt(params) {
  console.log("SDK: in encrypt...")
  console.log("SDK:", params)
  const type = encodeTypeByte(
    typeof params.type !== "undefined" ? params.type : TYPE_0
  );
  if (decodeTypeByte(type) === TYPE_1 && typeof params.senderPublicKey === "undefined") {
    throw new Error("Missing sender public key for type 1 envelope");
  }

  const senderPublicKey =
    typeof params.senderPublicKey !== "undefined"
      ? fromHex(params.senderPublicKey)
      : undefined;

  const iv =
    typeof params.iv !== "undefined" ? fromHex(params.iv) : params.randomBytes(IV_LENGTH);
  const key = fromHex(params.symKey);
  console.log("SDK: before sealed")
  console.log("SDK: ", { key, iv, message: toUtf8(params.message) })
  const sealed = nacl.secretbox(toUtf8(params.message), iv, key);

  console.log("SDK: SEALED!")
  console.log({ sealed })

  return serialize({ type, sealed, iv, senderPublicKey, encoding: params.encoding });
}

export function serialize(params) {
  const { encoding = BASE64 } = params;

  if (decodeTypeByte(params.type) === TYPE_2) {
    return toBase64(new Uint8Array([...params.type, ...params.sealed]));
  }
  if (decodeTypeByte(params.type) === TYPE_1) {
    if (typeof params.senderPublicKey === "undefined") {
      throw new Error("Missing sender public key for type 1 envelope");
    }
    return toBase64(
      new Uint8Array([
        ...params.type,
        ...params.senderPublicKey,
        ...params.iv,
        ...params.sealed,
      ])
    );
  }
  // default to type 0 envelope
  return toBase64(new Uint8Array([...params.type, ...params.iv, ...params.sealed]));
}

export function deserialize(params) {
  const { encoded, encoding = BASE64 } = params;
  const bytes = fromBase64(encoded);
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
