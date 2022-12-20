import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts"

import { AppError } from "../../lib/appError.ts"
import { prisma } from "../../database/prismaClient.ts"
import { ICreateSession } from "../../routes/sessions.routes.ts"

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const expirationTime = getNumericDate(60 * 60 * 6) // 6 hours

export async function startUserSession({ email, password }: ICreateSession) {
  const user = await prisma.user.findFirst({
    where: { email }
  })
  const passwordMatched = await bcrypt.compare(password, String(user?.password))

  if (!user || !passwordMatched) {
    throw new AppError('Credenciais incorretas', 401)
  }

  const jwt = await create(
    { alg: "HS512", typ: "JWT" },
    { exp: expirationTime, sub: user.id },
    key
  )

  const { password: _, ...rest } = user

  return { token: jwt, user: { ...rest } }
}