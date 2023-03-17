import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import type { GetStaticPaths, GetStaticProps } from 'next'

import { prisma } from '@lib/prisma'
import { Button, Heading, Text } from '@components/index'

import {
  Container,
  InfoContainer,
  ImageInfo,
  Section,
  RegisterContainer,
  Encounter,
  DateInfo,
} from './styles'

interface CourseData {
  id: string
  title: string
  target_audience: string
  objective: string
  observations: string
  content: string
}

interface MinisterData {
  id: string
  name: string
  qualification: string
}

interface CourseProps {
  course: CourseData
  ministers: MinisterData[]
}

export default function Course({ course, ministers }: CourseProps) {
  const router = useRouter()

  return (
    <>
      <NextSeo
        title={`${course.title} | PLACUR`}
        description={`Curso dedicado a ${course.target_audience}`}
      />

      <Container>
        <InfoContainer>
          <Heading size="lg">{course.title}</Heading>

          <ImageInfo>
            <Image
              src="/course_image_placeholder.png"
              alt={course.title}
              width={160}
              height={160}
            />

            <div>
              <Section>
                <Heading size="md">Público Alvo</Heading>
                <Text size="lg">{course.target_audience}</Text>
              </Section>

              <Section>
                <Heading size="md">Objetivo</Heading>
                <Text size="lg">{course.objective}</Text>
              </Section>
            </div>
          </ImageInfo>

          <Section>
            <Heading size="md">Observação</Heading>
            <Text size="lg">{course.observations}</Text>
          </Section>

          <Section>
            <Heading size="md">Conteúdo programático</Heading>
            <Text size="lg">{course.content}</Text>
          </Section>

          <Section>
            <Heading size="md">Ministrantes</Heading>

            {ministers.map((minister) => {
              return (
                <Text size="lg" as="p" key={minister.id}>
                  <strong>{minister.name}</strong> - {minister.qualification}
                </Text>
              )
            })}
          </Section>
        </InfoContainer>

        <RegisterContainer>
          <Encounter>
            <Heading size="sm">1º encontro</Heading>
            <DateInfo>26/08/2022 das 13h00 às 15h30</DateInfo>
          </Encounter>

          <Encounter>
            <Heading size="sm">2º encontro</Heading>
            <DateInfo>30/09/2022 das 13h00 às 14h30</DateInfo>
          </Encounter>

          <Button variant="secondary" onClick={() => router.push('/login')}>
            Faça login para se inscrever
          </Button>
        </RegisterContainer>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const courseId = String(params?.course_id)

  const course = await prisma.course.findFirstOrThrow({
    where: { id: courseId },
    include: {
      courses_ministers: true,
    },
  })

  if (!course) {
    return {
      notFound: true,
    }
  }

  const {
    courses_ministers: coursesMinisters,
    created_at: _,
    ...parsedCourse
  } = course

  const ministersList = await prisma.minister.findMany({
    where: {
      id: {
        in: coursesMinisters.map((courseMinister) =>
          String(courseMinister.minister_id)
        ),
      },
    },
  })

  const ministers = ministersList
    .filter((minister) => minister !== null)
    .map((minister) => {
      const { created_at: _, ...parsedMinister } = minister

      return parsedMinister
    })

  return {
    props: {
      course: parsedCourse,
      ministers,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
