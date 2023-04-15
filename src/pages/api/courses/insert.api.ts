import { z } from 'zod'
import dayjs from 'dayjs'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'
import { authOptions } from '@api/auth/[...nextauth].api'

const insertCourseBodySchema = z.object({
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
  ministers: z.array(
    z.object({
      name: z
        .string()
        .min(5, { message: 'Informe o nome completo' })
        .transform((value) => value.toLowerCase().trim()),
      qualification: z
        .string()
        .min(5, { message: 'Informe a formação completa' }),
    })
  ),
  axesOfKnowledge: z.array(z.string()),
  category: z.string(),
  meetings: z.array(
    z.object({
      date: z.date({ coerce: true }),
      startTime: z.number(),
      endTime: z.number(),
    })
  ),
  classes: z.array(
    z.object({
      name: z.string().transform((value) => value.toLowerCase().trim()),
      date: z.date({ coerce: true }),
      startTime: z.number(),
      endTime: z.number(),
    })
  ),
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
  if (!session.user.is_admin) {
    return res.status(401).end()
  }

  const {
    title,
    axesOfKnowledge,
    category,
    classes,
    content,
    meetings,
    ministers,
    objective,
    observations,
    targetAudience,
  } = insertCourseBodySchema.parse(req.body)

  const updatedMinisters = await Promise.all(
    ministers.map((minister) => {
      return prisma.minister.upsert({
        where: { name: minister.name },
        update: { qualification: minister.qualification },
        create: { name: minister.name, qualification: minister.qualification },
      })
    })
  )

  const dates =
    meetings.length > 0
      ? meetings
          .sort((a, b) => {
            return dayjs(a.date).unix() - dayjs(b.date).unix()
          })
          .map((item) => item.date)
      : classes
          .sort((a, b) => {
            return dayjs(a.date).unix() - dayjs(b.date).unix()
          })
          .map((item) => item.date)

  const newCourse = await prisma.course.create({
    data: {
      title,
      content,
      objective,
      observations,
      end_date: dates.at(-1),
      initial_date: dates.at(0),
      target_audience: targetAudience,
      category: { connect: { id: category } },
      axes_of_knowledge: axesOfKnowledge,
      classes: {
        createMany: {
          data: classes.map((item) => {
            return {
              name: item.name,
              date: item.date,
              start_time_in_minutes: item.startTime,
              end_time_in_minutes: item.endTime,
            }
          }),
        },
      },
      meetings: {
        createMany: {
          data: meetings.map((meet) => {
            return {
              date: meet.date,
              start_time_in_minutes: meet.startTime,
              end_time_in_minutes: meet.endTime,
            }
          }),
        },
      },
    },
  })

  await prisma.courseMinister.createMany({
    data: updatedMinisters.map((minister) => {
      return { course_id: newCourse.id, minister_id: minister.id }
    }),
  })

  return res.status(204).end()
}
