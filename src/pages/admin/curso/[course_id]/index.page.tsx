import { z } from 'zod'
import { NextSeo } from 'next-seo'
import { prisma } from '@lib/prisma'
import { Exam } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'

import { capitalizeSentence } from '@utils/capitalize-sentence'
import { authOptions } from '@pages/api/auth/[...nextauth].api'

import { FormContainer } from './styles'
import { Button, TextArea, TextInput } from '@components/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@lib/axios'
import { AxiosError } from 'axios'
import { useSetAtom } from 'jotai'
import { toastState } from '@atoms/toastAtom'

const CourseInfoFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Digite um nome com mais de três caracteres' })
    .transform((value) => value.toLowerCase()),
  targetAudience: z
    .string()
    .min(5, { message: 'Por favor, informe o público alvo' }),
  objective: z.string().min(5, { message: 'Por favor, informe o objetivo' }),
  observations: z
    .string()
    .min(5, { message: 'Por favor, informe as observações' }),
  content: z
    .string()
    .min(5, { message: 'Por favor, informe o conteúdo programático' }),
})

type CourseInfoFormData = z.infer<typeof CourseInfoFormSchema>

interface Course {
  id: string
  title: string
  target_audience: string
  objective: string
  observations: string
  content: string
}

interface AdminCourseProps {
  course: Course
}

export default function AdminCourse({ course }: AdminCourseProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseInfoFormData>({
    resolver: zodResolver(CourseInfoFormSchema),
    defaultValues: {
      title: course.title,
      content: course.content,
      objective: course.objective,
      observations: course.observations,
      targetAudience: course.target_audience,
    },
  })

  const setToast = useSetAtom(toastState)

  async function handleUpdateCourseData(data: CourseInfoFormData) {
    try {
      await api.post('/courses/update', { id: course.id, ...data })
    } catch (error: any) {
      const { response } = error as AxiosError<{ message: string }>

      setToast({
        title: 'Ops, temos um problema',
        description: response?.data.message ?? '',
        type: 'error',
        isOpen: true,
      })
    }
  }

  return (
    <>
      <NextSeo
        title={`${capitalizeSentence(course.title)} | PLACUR`}
        description="Administre este curso."
      />

      <FormContainer onSubmit={handleSubmit(handleUpdateCourseData)}>
        <TextInput
          Icon={Exam}
          isErrored={!!errors.title}
          placeholder={
            errors.title
              ? `Nome do curso - ${errors.title.message}`
              : 'Nome do curso'
          }
          {...register('title')}
        />

        <TextArea
          isErrored={!!errors.targetAudience}
          placeholder={
            errors.targetAudience
              ? `Público Alvo - ${errors.targetAudience.message}`
              : 'Público Alvo'
          }
          {...register('targetAudience')}
        />

        <TextArea
          isErrored={!!errors.objective}
          placeholder={
            errors.objective
              ? `Objetivo - ${errors.objective.message}`
              : 'Objetivo'
          }
          {...register('objective')}
        />

        <TextArea
          isErrored={!!errors.observations}
          placeholder={
            errors.observations
              ? `Observação - ${errors.observations.message}`
              : 'Observação'
          }
          {...register('observations')}
        />

        <TextArea
          isErrored={!!errors.content}
          placeholder={
            errors.content
              ? `Conteúdo programático - ${errors.content.message}`
              : 'Conteúdo programático'
          }
          {...register('content')}
        />

        <Button disabled={isSubmitting}>Próximo passo</Button>
      </FormContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<AdminCourseProps> = async ({
  req,
  res,
  params,
}) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      notFound: true,
    }
  }

  if (!session.user.is_admin) {
    return {
      notFound: true,
    }
  }

  const courseId = String(params?.course_id)

  const course = await prisma.course.findFirst({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      target_audience: true,
      objective: true,
      observations: true,
      content: true,
    },
  })

  if (!course) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      course,
    },
  }
}
