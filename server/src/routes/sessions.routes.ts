import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

import { prisma } from "../database/prismaClient.ts"
import { createUserSession } from "../services/sessions/createUserSession.ts"

const sessionsRouter = new Router()

interface ICreateSession {
  email: string
  password: string
}

sessionsRouter.post("/", async ({ request, response }) => {
  const body = request.body()
  const { email, password } = await body.value as ICreateSession

  const user = await prisma.user.findFirst({
    where: { email }
  })

  if (!user) {
    response.status = 401
    return response.body = { message: "Credenciais incorretas" }
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    response.status = 401
    return response.body = { message: "Credenciais incorretas" }
  }

  const { token } = await createUserSession(user.id);
  const {password: _, ...rest} = user;

  return response.body = { token, user: {...rest} }
})

export { sessionsRouter }
