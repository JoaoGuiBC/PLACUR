import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { prisma } from '../database/prismaClient.ts'

const usersRouter = new Router();

usersRouter.post('/', async ({ request, response }) => {
  const body = request.body()
  const value = await body.value

  console.log(value)

  const users = await prisma.user.count()

  return response.body = users
})

export { usersRouter }
