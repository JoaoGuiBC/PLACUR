import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const listUsersBodySchema = z.object({
  courseId: z.string().cuid(),
  queryKey: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(401).end()
  }
  if (!session.user.is_admin) {
    return res.status(401).end()
  }

  const { courseId, queryKey } = listUsersBodySchema.parse(req.query)

  const users = await prisma.user.findMany({
    where: {
      AND: [
        { CourseEnrollment: { some: { course_id: courseId } } },
        {
          OR: [
            { name: { contains: queryKey } },
            { document: { contains: queryKey } },
          ],
        },
      ],
    },
  })

  const course = await prisma.course.findUniqueOrThrow({
    where: { id: courseId },
    select: {
      meetings: {
        select: {
          id: true,
          enrollments: { select: { user_id: true, user_was_present: true } },
        },
        orderBy: { date: 'asc' },
      },
      classes: {
        select: {
          id: true,
          name: true,
          enrollments: { select: { user_id: true, user_was_present: true } },
        },
        orderBy: { date: 'asc' },
      },
    },
  })

  const { classes, meetings } = course

  const parsedUsers = users.map((user) => {
    const haveDisability =
      user!.have_hearing_disability ||
      user!.have_visual_disability ||
      user!.have_physical_disability ||
      user!.have_psychosocial_disability ||
      user!.have_visual_disability

    if (meetings.length > 0) {
      const userMeetings = meetings.map((meet) => {
        return {
          id: meet.id,
          user_was_present:
            meet.enrollments.find(
              (enrollment) => enrollment.user_id === user!.id
            )?.user_was_present ?? false,
        }
      })

      return {
        id: String(user!.id),
        name: String(user!.name),
        document: String(user!.document),
        haveDisability,
        class: null,
        meetings: userMeetings,
      }
    }

    if (classes.length > 0) {
      const userClass = classes.find((item) =>
        item.enrollments.find((enrollment) => {
          if (enrollment.user_id === user!.id) {
            return true
          } else {
            return false
          }
        })
      )

      return {
        id: String(user!.id),
        name: String(user!.name),
        document: String(user!.document),
        haveDisability,
        class: !userClass
          ? null
          : {
              id: userClass.id,
              name: userClass.name,
              user_was_present:
                userClass.enrollments.find(
                  (enrollment) => enrollment.user_id === user!.id
                )?.user_was_present || false,
            },
        meetings: [],
      }
    }

    return {
      id: String(user!.id),
      name: String(user!.name),
      document: String(user!.document),
      haveDisability,
      class: null,
      meetings: [],
    }
  })

  return res.json({ users: parsedUsers })
}
