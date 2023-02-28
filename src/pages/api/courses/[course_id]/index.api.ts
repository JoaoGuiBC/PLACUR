import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const courseId = String(req.query.course_id)

  const course = await prisma.course.findFirstOrThrow({
    where: { id: courseId },
    include: {
      courses_ministers: true,
    },
  })

  const { courses_ministers: coursesMinisters, ...parsedCourse } = course

  const ministers = await prisma.minister.findMany({
    where: {
      id: {
        in: coursesMinisters.map((courseMinister) =>
          String(courseMinister.minister_id)
        ),
      },
    },
  })

  return res.status(200).json({
    course: parsedCourse,
    ministers: ministers.filter((minister) => minister !== null),
  })
}
