import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '../auth/[...nextauth].api'

const listUsersBodySchema = z.object({
  name: z.string().transform((value) => value.toLowerCase()),
  document: z.string(),
  skip: z.number({ coerce: true }),
  take: z.number({ coerce: true }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.is_admin) {
    return res.status(401).end()
  }

  const { name, document, skip, take } = listUsersBodySchema.parse(req.query)

  if (name) {
    const countUsers = await prisma.user.count({
      where: { name: { contains: name } },
    })

    const users = await prisma.user.findMany({
      where: { name: { contains: name } },
      skip,
      take,
      orderBy: { name: 'desc' },
      select: {
        id: true,
        name: true,
        document: true,
        phone: true,
        updated_at: true,
        _count: {
          select: {
            CourseEnrollment: true,
          },
        },
      },
    })

    return res.json({ users, countUsers })
  }

  if (document) {
    const countUsers = await prisma.user.count({
      where: { document: { contains: document } },
    })

    const users = await prisma.user.findMany({
      where: { document: { contains: document } },
      skip,
      take,
      orderBy: { name: 'desc' },
      select: {
        id: true,
        name: true,
        document: true,
        phone: true,
        updated_at: true,
        _count: {
          select: {
            CourseEnrollment: true,
          },
        },
      },
    })

    return res.json({ users, countUsers })
  }

  const countUsers = await prisma.user.count()

  const users = await prisma.user.findMany({
    skip,
    take,
    orderBy: { name: 'desc' },
    select: {
      id: true,
      name: true,
      document: true,
      phone: true,
      updated_at: true,
      _count: {
        select: {
          CourseEnrollment: true,
        },
      },
    },
  })

  return res.json({ users, countUsers })
}
