import dayjs from 'dayjs'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import type { GetStaticProps } from 'next'

import { prisma } from '@lib/prisma'

import {
  Container,
  QuantityInfoContainer,
  Separator,
  CoursesContainer,
  CoursesSection,
} from './styles'
import { Heading, CourseCard, Categories } from '@components/index'

interface Course {
  id: string
  title: string
  end_date: string
  category: Categories
  initial_date: string
  image: string | null
}

interface MyCoursesProps {
  endedCourses: Course[]
  ongoingCourses: Course[]
}

export default function MyCourses({
  endedCourses,
  ongoingCourses,
}: MyCoursesProps) {
  return (
    <>
      <NextSeo
        title="Meus cursos | PLACUR"
        description="Lista com todas as informações sobre os cursos nos quais você está inscrito."
      />
      <Container>
        <Heading>Meus cursos</Heading>

        <QuantityInfoContainer>
          <Heading as="strong" size="md" style="secondary">
            {`Cursos inscritos: ${endedCourses.length + ongoingCourses.length}`}
          </Heading>

          <Separator decorative />

          <Heading as="strong" size="md" style="secondary">
            {`Cursos finalizados: ${endedCourses.length}`}
          </Heading>
        </QuantityInfoContainer>

        <CoursesContainer>
          <CoursesSection>
            <Heading as="h2" size="sm">
              CURSOS ABERTOS
            </Heading>

            {ongoingCourses.map((course) => (
              <Link key={course.id} href={`/curso/${course.id}`}>
                <CourseCard
                  title={course.title}
                  image={course.image || undefined}
                  category={course.category}
                  lastDate={course.end_date}
                  firstDate={course.initial_date}
                />
              </Link>
            ))}
          </CoursesSection>

          <CoursesSection>
            <Heading as="h2" size="sm">
              CURSOS FINALIZADOS
            </Heading>

            {endedCourses.map((course) => (
              <Link key={course.id} href={`/curso/${course.id}`}>
                <CourseCard
                  finished
                  title={course.title}
                  image={course.image || undefined}
                  category={course.category}
                  lastDate={course.end_date}
                  firstDate={course.initial_date}
                />
              </Link>
            ))}
          </CoursesSection>
        </CoursesContainer>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<MyCoursesProps> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const userId = String(params.userId)

  const doesUserExists = await prisma.user.findFirst({
    where: { id: userId },
  })

  if (!doesUserExists) {
    return {
      notFound: true,
    }
  }

  const courses = await prisma.course.findMany({
    where: { enrollments: { some: { user_id: userId } } },
    select: {
      id: true,
      title: true,
      image: true,
      end_date: true,
      initial_date: true,
      category: { select: { title: true } },
    },
    orderBy: { initial_date: 'asc' },
  })

  const ongoingCourses = courses
    .filter((course) => dayjs(String(course.end_date)).isAfter(new Date()))
    .map((course) => ({
      id: course.id,
      title: course.title,
      image: course.image,
      category: course.category!.title as Categories,
      end_date: dayjs(course.end_date!).format('DD/MM/YYYY'),
      initial_date: dayjs(course.initial_date).format('DD/MM/YYYY'),
    }))
  const endedCourses = courses
    .filter((course) => dayjs(String(course.end_date)).isBefore(new Date()))
    .map((course) => ({
      id: course.id,
      title: course.title,
      image: course.image,
      category: course.category!.title as Categories,
      end_date: dayjs(course.end_date!).format('DD/MM/YYYY'),
      initial_date: dayjs(course.initial_date).format('DD/MM/YYYY'),
    }))

  return {
    props: {
      endedCourses,
      ongoingCourses,
    },
  }
}
