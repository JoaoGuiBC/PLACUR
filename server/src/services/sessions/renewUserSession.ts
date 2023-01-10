import { create, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts";

import { key } from "../../lib/keys/jwtKey.ts";

const expirationTime = getNumericDate(60 * 60 * 6); // 6 hours

export async function renewUserSession(userId: string) {
  const jwt = await create(
    { alg: "HS512", typ: "JWT" },
    { exp: expirationTime, sub: userId },
    key,
  );

  return { token: jwt };
}
