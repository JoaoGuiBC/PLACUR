import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

import { prisma } from "../database/prismaClient.ts"

const usersRouter = new Router()

interface ICreateUser {
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

  const {
    address,
    city,
    document,
    email,
    haveHearingImpairment,
    haveVisualImpairment,
    isAdmin,
    isPublicAgent,
    name,
    neighborhood,
    password,
    phone,
    office
  } = await body.value as ICreateUser

  const cleanedDocument = document.replace(/\D/g,'');

  const checkIfEmailIsAlreadyUsed = await prisma.user.findUnique({
    where: { email }
  })

  if (checkIfEmailIsAlreadyUsed) {
    response.status = 406
    return response.body = { message: "E-Mail já em uso, por favor insira outro" }
  }

  const checkIfDocumentIsAlreadyUsed = await prisma.user.findUnique({
    where: { document: cleanedDocument }
  })

  if (checkIfDocumentIsAlreadyUsed) {
    response.status = 406
    return response.body = { message: "CPF já em uso, por favor insira outro" }
  }

  const hashPassword = await bcrypt.hash(password)

  const user = await prisma.user.create({
    data: {
      address,
      city,
      document: cleanedDocument,
      email,
      haveHearingImpairment,
      haveVisualImpairment,
      isAdmin,
      isPublicAgent,
      name,
      neighborhood,
      password: hashPassword,
      phone,
      office
    },
  })

  return response.body = user
})

export { usersRouter }
