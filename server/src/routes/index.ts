import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

const router = new Router()

router.get('/test', ({ response }) => {
  return response.body = { connected: true }
})

export { router }
