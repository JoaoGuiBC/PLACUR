import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts"

import { prisma } from "../database/prismaClient.ts"

const sessionsRouter = new Router()

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const expirationTime = getNumericDate(60 * 60 * 6) // 6 hours

interface ICreateSession {
  email: string
  password: string
}

sessionsRouter.post("/", async ({ request, response }) => {
  const body = request.body()

  const { email, password } = await body.value as ICreateSession

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    response.status = 401
    return response.body = { message: "Credenciais incorretas" }
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    response.status = 401
    return response.body = { message: "Credenciais incorretas" }
  }

  const jwt = await create({ alg: "HS512", typ: "JWT" }, { exp: expirationTime, sub: user.id }, key);
  const {password: _, ...rest} = user;

  return response.body = { jwt, user: {...rest} }
})

export { sessionsRouter }
