import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { createUserSession } from "../services/sessions/createUserSession.ts"

const sessionsRouter = new Router()

export interface ICreateSession {
  email: string
  password: string
}

sessionsRouter.post("/", async ({ request, response }) => {
  const body = request.body()
  const userCredentials = await body.value as ICreateSession

  const session = await createUserSession(userCredentials)

  return response.body = session
})

export { sessionsRouter }
