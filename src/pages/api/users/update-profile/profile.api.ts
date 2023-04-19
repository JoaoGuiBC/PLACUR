import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '../../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Informe o seu nome completo.' })
    .transform((value) => value.toLowerCase().trim()),
  document: z.string().min(11, { message: 'Informe um CPF válido' }),
  phone: z.string().min(10, { message: 'Informe um telefone válido' }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(401).end()
  }

  const { name, document, phone } = updateProfileBodySchema.parse(req.body)

  const checkIfDocumentIsAlreadyUsed = await prisma.user.findUnique({
    where: { document },
  })

  if (
    checkIfDocumentIsAlreadyUsed &&
    checkIfDocumentIsAlreadyUsed.email !== session.user.email
  ) {
    return res
      .status(401)
      .json({ message: 'Esse CPF já foi utilizado por outra conta.' })
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
      document,
      phone,
    },
  })

  return res.status(204).end()
}
