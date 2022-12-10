import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { router } from './routes/index.ts'
import { AppError } from "./lib/appError.ts"

const app = new Application()

app.use(async (context, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof AppError) {
      context.response.status = err.statusCode
    } else {
      context.response.status = 500
    }
    context.response.body = { error: err.message }
    context.response.type = "json"
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log('Listening on port 3333')

app.listen({ port: 3333 })
