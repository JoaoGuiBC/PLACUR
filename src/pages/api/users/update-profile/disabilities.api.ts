import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '../../auth/[...nextauth].api'

const updateAddressBodySchema = z.object({
  visualDisability: z.boolean(),
  physicalDisability: z.boolean(),
  hearingDisability: z.boolean(),
  intellectualDisability: z.boolean(),
  psychosocialDisability: z.boolean(),
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
    hearingDisability,
    intellectualDisability,
    physicalDisability,
    psychosocialDisability,
    visualDisability,
  } = updateAddressBodySchema.parse(req.body)

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      have_hearing_disability: hearingDisability,
      have_intellectual_disability: intellectualDisability,
      have_physical_disability: physicalDisability,
      have_psychosocial_disability: psychosocialDisability,
      have_visual_disability: visualDisability,
      updated_at: new Date(),
    },
  })

  return res.status(204).end()
}
