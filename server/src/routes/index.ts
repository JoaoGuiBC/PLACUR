import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { usersRouter } from "./users.routes.ts"

const router = new Router()

router.get('/test', ({ response }) => {
  return response.body = { connected: true }
})

router.use(['/users'], usersRouter.routes())

export { router }
