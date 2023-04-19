import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  id: z.string().cuid({ message: 'Informe um id válido.' }),
  email: z.string().email({ message: 'Informe um email válido.' }),
  name: z
    .string()
    .min(4, { message: 'Informe o seu nome completo.' })
    .transform((value) => value.toLowerCase().trim()),
  document: z.string().min(11, { message: 'Informe um CPF válido' }),
  phone: z.string().min(10, { message: 'Informe um telefone válido' }),
  address: z
    .string()
    .min(4, { message: 'Informe o seu endereço.' })
    .transform((value) => value.toLowerCase()),
  neighborhood: z
    .string()
    .min(4, { message: 'Informe o seu bairro.' })
    .transform((value) => value.toLowerCase()),
  city: z
    .string()
    .min(4, { message: 'Informe a sua cidade.' })
    .transform((value) => value.toLowerCase()),
  isAdmin: z.boolean(),
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

  const {
    id,
    name,
    email,
    phone,
    isAdmin,
    document,
    city,
    address,
    neighborhood,
  } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      document,
      is_admin: isAdmin,
      city,
      address,
      neighborhood,
    },
  })

  return res.status(204).end()
}
