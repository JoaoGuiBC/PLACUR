import { z } from 'zod'
import dayjs from 'dayjs'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '../auth/[...nextauth].api'

const listAllCoursesBodySchema = z.object({
  title: z.string().transform((value) => value.toLowerCase()),
  axisOfKnowledge: z.string(),
  category: z.string(),
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

  const { title, axisOfKnowledge, category, skip, take } =
    listAllCoursesBodySchema.parse(req.query)

  let courses = []
  let countCourses = 0

  if (axisOfKnowledge) {
    countCourses = await prisma.course.count({
      where: {
        title: { contains: title },
        axes_of_knowledge: { has: axisOfKnowledge },
        category: { id: { contains: category } },
      },
    })

    courses = await prisma.course.findMany({
      where: {
        title: { contains: title },
        axes_of_knowledge: { has: axisOfKnowledge },
        category: { id: { contains: category } },
      },
      skip,
      take,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        category: true,
        classes: true,
        meetings: true,
      },
    })
  } else {
    countCourses = await prisma.course.count({
      where: {
        title: { contains: title },
        category: { id: { contains: category } },
      },
    })

    courses = await prisma.course.findMany({
      where: {
        title: { contains: title },
        category: { id: { contains: category } },
      },
      skip,
      take,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        category: true,
        classes: true,
        meetings: true,
      },
    })
  }

  const parsedCourses = courses.map((course) => {
    const allDates =
      course.classes.length > 0
        ? course.classes.map((item) => item.date)
        : course.meetings.map((item) => item.date)

    const dates = {
      firstDate: allDates.length === 0 ? null : allDates[0],
      lastDate: allDates.length === 0 ? null : allDates[allDates.length - 1],
    }

    const isFinished = dates.lastDate
      ? dayjs(dates.lastDate).startOf('day').isBefore(new Date())
      : false

    return {
      id: course.id,
      title: course.title,
      category: String(course.category?.title),
      isFinished,
      firstDate: dates.firstDate
        ? dayjs(dates.firstDate).format('DD/MM/YYYY')
        : null,
      lastDate: dates.lastDate
        ? dayjs(dates.lastDate).format('DD/MM/YYYY')
        : null,
    }
  })

  return res.json({ courses: parsedCourses, countCourses })
}
