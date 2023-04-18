import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const deleteUserQuerySchema = z.object({
  id: z.string().cuid({ message: 'Informe um id válido' }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(401).end()
  }

  const { id } = deleteUserQuerySchema.parse(req.query)

  await prisma.user.delete({
    where: { id },
  })

  return res.status(204).end()
}
