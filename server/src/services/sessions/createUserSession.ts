import { create, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts"

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const expirationTime = getNumericDate(60 * 60 * 6) // 6 hours

export async function createUserSession(userId: string) {
  const jwt = await create({ alg: "HS512", typ: "JWT" }, { exp: expirationTime, sub: userId }, key);
  
  return { token: jwt }
}