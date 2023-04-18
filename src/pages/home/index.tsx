import dayjs from 'dayjs'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useSetAtom } from 'jotai'
import { AxiosError } from 'axios'
import type { GetServerSideProps } from 'next'
import { useQuery } from '@tanstack/react-query'
import { FormEvent, useEffect, useState } from 'react'

import { prisma } from '@lib/prisma'
import { toastState } from '@atoms/toastAtom'
import { axesOfKnowledge } from '@utils/selectValues'
import { capitalizeSentence } from '@utils/capitalize-sentence'
import { listHomeCoursesQuery } from '@utils/queries/list-home-courses-query'

import {
  Select,
  Heading,
  Searchbar,
  CourseCard,
  Categories,
} from '@components/index'
import { CoursesContainer, FilterContainer } from './styles'

interface Course {
  id: string
  title: string
  end_date: string
  initial_date: string
  image: string | null
  category: Categories
}

interface HomeProps {
  ongoingCourses: Course[]
  finishedCourses: Course[]
}

export default function Home({ finishedCourses, ongoingCourses }: HomeProps) {
  const [title, setTitle] = useState('')
  const [axisOfKnowledge, setAxisOfKnowledge] = useState('')
  const [isInitialRender, setIsInitialRender] = useState(true)

  const setToast = useSetAtom(toastState)

  const { data: coursesList, refetch } = useQuery<HomeProps>(
    ['homeCoursesList'],
    async () => {
      try {
        return await listHomeCoursesQuery({
          title,
          axisOfKnowledge,
        })
      } catch (error: any) {
        const { response } = error as AxiosError<{ message: string }>

        setToast({
          title: 'Ops, temos um problema',
          description: response?.data.message ?? 'Erro ao recuperar cursos.',
          type: 'error',
          isOpen: true,
        })

        return { ongoingCourses, finishedCourses }
      }
    },
    { enabled: false, initialData: { ongoingCourses, finishedCourses } }
  )

  async function handleSearch(event?: FormEvent) {
    event && event.preventDefault()

    refetch()
  }

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    } else {
      handleSearch()
    }
  }, [axisOfKnowledge])

  return (
    <>
      <NextSeo
        title="Cursos | PLACUR"
        description="Escolha um curso para se inscrever, ou consulte um curso que já tenha sido finalizado."
      />

      <FilterContainer>
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
      </FilterContainer>

      <Heading>Cursos com inscrições abertas</Heading>

      <CoursesContainer>
        {coursesList.ongoingCourses.map((course) => (
          <Link key={course.id} href={`/curso/${course.id}`}>
            <CourseCard
              image={course.image || '/course_image_placeholder.png'}
              title={capitalizeSentence(course.title)}
              firstDate={course.initial_date}
              lastDate={course.end_date}
              category={course.category}
            />
          </Link>
        ))}
      </CoursesContainer>

      <Heading>Cursos Finalizados</Heading>

      <CoursesContainer>
        {coursesList.finishedCourses.map((course) => (
          <Link key={course.id} href={`/curso/${course.id}`}>
            <CourseCard
              finished
              image={course.image || '/course_image_placeholder.png'}
              title={capitalizeSentence(course.title)}
              firstDate={course.initial_date}
              lastDate={course.end_date}
              category={course.category}
            />
          </Link>
        ))}
      </CoursesContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const ongoingCourses = await prisma.course.findMany({
    where: {
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

  const finishedCourses = await prisma.course.findMany({
    where: {
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

  const parsedOngoingCourses = ongoingCourses.map((course) => {
    return {
      id: course.id,
      image: course.image,
      title: course.title,
      initial_date: dayjs(course.initial_date!)
        .add(1, 'day')
        .format('DD/MM/YYYY'),
      end_date: dayjs(course.end_date!).add(1, 'day').format('DD/MM/YYYY'),
      category: course.category!.title as Categories,
    }
  })

  const parsedFinishedCourses = finishedCourses.map((course) => {
    return {
      id: course.id,
      image: course.image,
      title: course.title,
      initial_date: dayjs(course.initial_date!)
        .add(1, 'day')
        .format('DD/MM/YYYY'),
      end_date: dayjs(course.end_date!).add(1, 'day').format('DD/MM/YYYY'),
      category: course.category!.title as Categories,
    }
  })

  return {
    props: {
      ongoingCourses: parsedOngoingCourses,
      finishedCourses: parsedFinishedCourses,
    },
  }
}
