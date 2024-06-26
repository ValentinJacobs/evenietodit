import type {TAlgorithm} from "jwt-simple";
// TODO: fix jwt-simple types
import jwt from "jwt-simple";

const {encode, decode} = jwt;

/**
 * jwt token has iat which is issued at unix timestamp, an optional exp for expiry,
 * an optional id as unique identifier, and an optional clv for client type/version
 */
export type JwtClaim = {iat: number; exp?: number; id?: string; clv?: string};

export function encodeJwtToken(
  claim: JwtClaim,
  jwtSecret: Buffer | Uint8Array | string,
  algorithm: TAlgorithm = "HS256"
): string {
  const token = encode(
    claim,
    // Note: This type casting is required as even though jwt-simple accepts a buffer as a
    // secret types definitions exposed by @types/jwt-simple only takes a string
    jwtSecret as unknown as string,
    algorithm
  );
  return token;
}

export function decodeJwtToken(
  token: string,
  jwtSecret: Buffer | Uint8Array | string,
  algorithm: TAlgorithm = "HS256"
): JwtClaim {
  const claim = decode(token, jwtSecret as never as string, false, algorithm) as JwtClaim;
  return claim;
}
