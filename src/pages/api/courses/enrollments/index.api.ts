import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const enrollBodySchema = z.object({
  courseId: z.string().cuid(),
  userId: z.string().cuid(),
  meetings: z.array(z.string()).optional(),
  chosenClass: z.string().optional(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(401).end()
  }

  const { courseId, userId, meetings, chosenClass } = enrollBodySchema.parse(
    req.body
  )

  if (chosenClass) {
    const isAlreadyEnrolledInClass =
      await prisma.meetingClassEnrollment.findFirst({
        where: { user_id: userId, NOT: { class_id: null } },
      })

    await prisma.meetingClassEnrollment.upsert({
      where: { id: isAlreadyEnrolledInClass?.id || '' },
      create: { class_id: chosenClass, user_id: userId },
      update: { class_id: chosenClass },
    })
  } else {
    await prisma.meetingClassEnrollment.createMany({
      data: meetings!.map((meeting) => ({
        user_id: userId,
        meeting_id: meeting,
      })),
    })
  }

  await prisma.courseEnrollment.create({
    data: { course_id: courseId, user_id: userId },
  })

  return res.status(204).end()
}
