import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

import { prisma } from "../../database/prismaClient.ts"
import { ICreateUser } from "../../routes/users.routes.ts"

export async function createUser(userData: ICreateUser, document: string) {
  const hashPassword = await bcrypt.hash(userData.password)

  const user = await prisma.user.create({
    data: {
      address: userData.address,
      city: userData.city,
      document,
      email: userData.email,
      haveHearingImpairment: userData.haveHearingImpairment,
      haveVisualImpairment: userData.haveVisualImpairment,
      isAdmin: userData.isAdmin,
      isPublicAgent: userData.isPublicAgent,
      name: userData.name,
      neighborhood: userData.neighborhood,
      password: hashPassword,
      phone: userData.phone,
      office: userData.office,
    },
  })

  return { user }
}