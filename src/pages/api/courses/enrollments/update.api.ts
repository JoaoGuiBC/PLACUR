import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const updateEnrollBodySchema = z.object({
  courseUser: z.array(
    z.object({
      id: z.string().cuid({ message: 'Id inválido' }),
      action: z.string(),
      class: z
        .object({
          id: z.string().cuid({ message: 'Id inválido' }),
          old_id: z.string().cuid({ message: 'Id inválido' }),
          user_was_present: z.boolean(),
        })
        .nullable(),
      meetings: z.array(
        z.object({
          id: z.string().cuid({ message: 'Id inválido' }),
          user_was_present: z.boolean(),
        })
      ),
    })
  ),
  courseId: z.string().cuid({ message: 'Id inválido' }),
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

  const { courseUser, courseId } = updateEnrollBodySchema.parse(req.body)

  await Promise.all(
    courseUser.map(async (enroll) => {
      if (enroll.class) {
        const enrollId = await prisma.meetingClassEnrollment.findFirst({
          where: { user_id: enroll.id, class_id: enroll.class.old_id },
          select: { id: true },
        })

        if (!enrollId) return

        if (enroll.action === 'update') {
          return await prisma.meetingClassEnrollment.update({
            where: { id: enrollId.id },
            data: {
              class_id: enroll.class.id,
              user_was_present: enroll.class.user_was_present,
            },
          })
        }
        if (enroll.action === 'delete') {
          const courseEnroll = await prisma.courseEnrollment.findFirst({
            where: { user_id: enroll.id, course_id: courseId },
          })

          if (!courseEnroll) return

          await prisma.courseEnrollment.delete({
            where: { id: courseEnroll.id },
          })

          return await prisma.meetingClassEnrollment.delete({
            where: { id: enrollId.id },
          })
        }
      } else if (enroll.meetings.length > 0) {
        return await Promise.all(
          enroll.meetings.map(async (meet) => {
            const enrollId = await prisma.meetingClassEnrollment.findFirst({
              where: { user_id: enroll.id, meeting_id: meet.id },
              select: { id: true },
            })

            if (!enrollId) return

            if (enroll.action === 'update') {
              return await prisma.meetingClassEnrollment.update({
                where: { id: enrollId.id },
                data: {
                  user_was_present: meet.user_was_present,
                },
              })
            }
            if (enroll.action === 'delete') {
              const courseEnroll = await prisma.courseEnrollment.findFirst({
                where: { user_id: enroll.id, course_id: courseId },
              })

              if (!courseEnroll) return

              await prisma.courseEnrollment.delete({
                where: { id: courseEnroll.id },
              })

              return await prisma.meetingClassEnrollment.delete({
                where: { id: enrollId.id },
              })
            }
          })
        )
      }
    })
  )

  return res.status(204).end()
}
