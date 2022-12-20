import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

import { AppError } from "../../lib/appError.ts"
import { prisma } from "../../database/prismaClient.ts"
import { ICreateUser } from "../../routes/users.routes.ts"

export async function createUser(userData: ICreateUser) {
  const cleanedDocument = userData.document.replace(/\D/g,'')
  const cleanedPhone = userData.phone.replace(/\D/g,'')

  const checkIfUserAlreadyExists = await prisma.user.findFirst({
    where: { OR: [{ email: userData.email }, { document: cleanedDocument }] }
  })

  if (checkIfUserAlreadyExists) {
    throw new AppError('E-mail e/ou CPF já em uso, por favor revise os dados', 406)
  }
  
  const hashPassword = await bcrypt.hash(userData.password)

  const user = await prisma.user.create({
    data: {
      ...userData,
      document: cleanedDocument,
      phone: cleanedPhone,
      password: hashPassword
    },
  })

  return { user }
}