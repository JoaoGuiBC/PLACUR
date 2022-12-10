import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { AppError } from "../lib/appError.ts"
import { prisma } from "../database/prismaClient.ts"

import { createUser } from "../services/users/createUser.ts"

const usersRouter = new Router()

export interface ICreateUser {
  email: string
  password: string
  name: string
  document: string
  phone: string
  isPublicAgent: boolean
  office?: string
  address: string
  neighborhood: string
  city: string
  haveVisualImpairment: boolean
  haveHearingImpairment: boolean
  isAdmin: boolean
}

usersRouter.get("/", async ({ request, response }) => {
  const userId = String(request.url.searchParams.get("userId"))

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  return response.body = user
})

usersRouter.post("/", async ({ request, response }) => {
  const body = request.body()

  const userData = await body.value as ICreateUser
  const cleanedDocument = userData.document.replace(/\D/g,'')

  const checkIfUserAlreadyExists = await prisma.user.findFirst({
    where: { email: userData.email, OR: { document: cleanedDocument } }
  })

  if (checkIfUserAlreadyExists) {
    throw new AppError('E-mail e/ou CPF já em uso, por favor revise os dados', 406)
  }

  const { user } = await createUser(userData, cleanedDocument)

  return response.body = user
})

export { usersRouter }
