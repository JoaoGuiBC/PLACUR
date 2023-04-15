import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const updateCourseBodySchema = z.object({
  id: z.string().cuid({ message: 'Informe um id de curso válido' }),
  title: z
    .string()
    .min(3, { message: 'Digite um nome com mais de três caracteres' })
    .transform((value) => value.toLowerCase().trim()),
  targetAudience: z
    .string()
    .min(5, { message: 'Público alvo deve ter mais de cinco caracteres' }),
  objective: z
    .string()
    .min(5, { message: 'Objetivo deve ter mais de cinco caracteres' }),
  observations: z
    .string()
    .min(5, { message: 'Observações devem ter mais de cinco caracteres' }),
  content: z.string().min(5, {
    message: 'Conteúdo programático deve ter mais de cinco caracteres',
  }),
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
  if (!session.user.is_admin) {
    return res.status(401).end()
  }

  const { id, title, objective, observations, targetAudience, content } =
    updateCourseBodySchema.parse(req.body)

  await prisma.course.update({
    where: { id },
    data: {
      title,
      content,
      objective,
      observations,
      target_audience: targetAudience,
    },
  })

  return res.status(204).end()
}
