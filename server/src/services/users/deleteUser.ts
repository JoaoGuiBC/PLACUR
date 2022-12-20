import { prisma } from "../../database/prismaClient.ts"
import { AppError } from "../../lib/appError.ts"

export async function deleteUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new AppError('Usuário inexistente.', 404)
  }

  await prisma.user.delete({
    where: { id: userId }
  })
}