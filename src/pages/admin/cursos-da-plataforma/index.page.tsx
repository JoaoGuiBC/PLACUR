import dayjs from 'dayjs'
import Link from 'next/link'
import { useSetAtom } from 'jotai'
import { NextSeo } from 'next-seo'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'
import { useQuery } from '@tanstack/react-query'
import { FormEvent, useEffect, useState } from 'react'

import { prisma } from '@lib/prisma'
import { toastState } from '@atoms/toastAtom'
import { authOptions } from '@api/auth/[...nextauth].api'
import { axesOfKnowledge, courseCategories } from '@utils/selectValues'
import { listAllCoursesQuery } from '@utils/queries/list-all-courses-query'

import { Select } from '@components/Select'
import { Button } from '@components/Button'
import { Searchbar } from '@components/Searchbar'
import { CourseCard } from '@components/CourseCard'
import { Pagination } from '@components/Pagination'

import { ActionsContainer, CoursesContainer } from './styles'

interface Course {
  id: string
  title: string
  category: string
  isFinished: boolean
  firstDate: string | null
  lastDate: string | null
}

interface AppCoursesProps {
  courses: Course[]
  countCourses: number
  coursesPerPage: number
}

export default function AppCourses({
  courses,
  countCourses,
  coursesPerPage,
}: AppCoursesProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [axisOfKnowledge, setAxisOfKnowledge] = useState('')

  const setToast = useSetAtom(toastState)

  const { data: coursesList, refetch } = useQuery<{
    courses: Course[]
    countCourses: number
  }>(
    ['allCoursesList'],
    async () => {
      try {
        return await listAllCoursesQuery({
          title,
          axisOfKnowledge,
          category,
          take: coursesPerPage,
          skip: (currentPage - 1) * coursesPerPage,
        })
      } catch (error: any) {
        const { response } = error as AxiosError<{ message: string }>

        setToast({
          title: 'Ops, temos um problema',
          description: response?.data.message ?? 'Erro ao recuperar cursos.',
          type: 'error',
          isOpen: true,
        })

        return { courses, countCourses }
      }
    },
    { enabled: false, initialData: { courses, countCourses } }
  )

  async function handleSearch(event?: FormEvent) {
    event && event.preventDefault()

    refetch()
  }

  useEffect(() => {
    handleSearch()
  }, [axisOfKnowledge, category])

  return (
    <>
      <NextSeo
        title="Administrar cursos | PLACUR"
        description="Selecione um curso para visualizar e editar as informações dele."
      />

      <ActionsContainer>
        <Searchbar
          placeholder="Buscar curso"
          value={title}
          onChange={({ currentTarget }) => setTitle(currentTarget.value)}
          onSearch={handleSearch}
        />

        <Select
          content={axesOfKnowledge}
          emptyValue="Filtrar por eixo de conhecimento"
          onValueChange={(value) => setAxisOfKnowledge(value)}
        />

        <Select
          content={courseCategories}
          emptyValue="Filtrar por categoria"
          onValueChange={(value) => setCategory(value)}
        />

        <Link href="/admin/inserir-novo-curso">
          <Button size="min">Adicionar um curso</Button>
        </Link>
      </ActionsContainer>

      <Pagination
        totalCountOfRegisters={coursesList.countCourses}
        currentPage={currentPage}
        registerPerPage={12}
        onPageChange={setCurrentPage}
      />

      <CoursesContainer>
        {coursesList.courses.map((course) => (
          <Link key={course.id} href={`/admin/curso/${course.id}`}>
            <CourseCard
              title={course.title}
              firstDate={course.firstDate}
              lastDate={course.lastDate}
              finished={course.isFinished}
              category={course.category}
            />
          </Link>
        ))}
      </CoursesContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<AppCoursesProps> = async ({
  req,
  res,
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

  const coursesPerPage = 12

  const countCourses = await prisma.course.count()
  const courses = await prisma.course.findMany({
    orderBy: { created_at: 'desc' },
    take: coursesPerPage,
    select: {
      id: true,
      title: true,
      category: true,
      classes: { orderBy: { date: 'asc' } },
      meetings: { orderBy: { date: 'asc' } },
    },
  })

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
      ? dayjs(dates.lastDate).startOf('day').isAfter(new Date())
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

  return { props: { courses: parsedCourses, countCourses, coursesPerPage } }
}
