import { z } from 'zod'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { Categories } from '@components/CourseCard'

const listHomeCoursesBodySchema = z.object({
  title: z.string().transform((value) => value.toLowerCase()),
  axisOfKnowledge: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { title, axisOfKnowledge } = listHomeCoursesBodySchema.parse(req.query)

  let ongoingCourses = []
  let finishedCourses = []

  if (axisOfKnowledge) {
    ongoingCourses = await prisma.course.findMany({
      where: {
        title: { contains: title },
        axes_of_knowledge: { has: axisOfKnowledge },
        end_date: {
          gt: dayjs(new Date()).format(),
        },
      },
      orderBy: { initial_date: 'desc' },
      select: {
        id: true,
        image: true,
        title: true,
        initial_date: true,
        end_date: true,
        category: { select: { title: true } },
      },
    })

    finishedCourses = await prisma.course.findMany({
      where: {
        title: { contains: title },
        axes_of_knowledge: { has: axisOfKnowledge },
        end_date: {
          lt: dayjs(new Date()).format(),
        },
      },
      orderBy: { initial_date: 'desc' },
      select: {
        id: true,
        image: true,
        title: true,
        initial_date: true,
        end_date: true,
        category: { select: { title: true } },
      },
      take: 12,
    })
  } else {
    ongoingCourses = await prisma.course.findMany({
      where: {
        title: { contains: title },
        end_date: {
          gt: dayjs(new Date()).format(),
        },
      },
      orderBy: { initial_date: 'desc' },
      select: {
        id: true,
        image: true,
        title: true,
        initial_date: true,
        end_date: true,
        category: { select: { title: true } },
      },
    })

    finishedCourses = await prisma.course.findMany({
      where: {
        title: { contains: title },
        end_date: {
          lt: dayjs(new Date()).format(),
        },
      },
      orderBy: { initial_date: 'desc' },
      select: {
        id: true,
        image: true,
        title: true,
        initial_date: true,
        end_date: true,
        category: { select: { title: true } },
      },
      take: 12,
    })
  }

  const parsedOngoingCourses = ongoingCourses.map((course) => {
    return {
      id: course.id,
      image: course.image,
      title: course.title,
      initial_date: dayjs(course.initial_date!).format('DD/MM/YYYY'),
      end_date: dayjs(course.end_date!).format('DD/MM/YYYY'),
      category: course.category!.title as Categories,
    }
  })

  const parsedFinishedCourses = finishedCourses.map((course) => {
    return {
      id: course.id,
      image: course.image,
      title: course.title,
      initial_date: dayjs(course.initial_date!).format('DD/MM/YYYY'),
      end_date: dayjs(course.end_date!).format('DD/MM/YYYY'),
      category: course.category!.title as Categories,
    }
  })

  return res.json({
    ongoingCourses: parsedOngoingCourses,
    finishedCourses: parsedFinishedCourses,
  })
}
