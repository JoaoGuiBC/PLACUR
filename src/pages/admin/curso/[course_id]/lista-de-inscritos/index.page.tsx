import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'
import { useQuery } from '@tanstack/react-query'

import { api } from '@lib/axios'
import { prisma } from '@lib/prisma'
import { toastState } from '@atoms/toastAtom'
import { courseUsers } from '@atoms/courseUsersAtom'
import { authOptions } from '@api/auth/[...nextauth].api'
import { capitalizeSentence } from '@utils/capitalize-sentence'
import { listCourseUsersQuery } from '@utils/queries/list-course-users-query'

import { ClassesRow } from './ClassesRow'
import { SingleMeetingRow } from './SingleMeetingRow'
import { MultipleMeetingRow } from './MultipleMeetingRow'

import { Button, Searchbar } from '@components/index'
import { ListContainer, FunctionsContainer } from './styles'

export interface QueryUsersProps {
  queryBy: 'document' | 'name'
  queryKey: string
}

interface UserClass {
  id: string
  name: string
  user_was_present: boolean
}

interface UserMeeting {
  id: string
  user_was_present: boolean
}

export interface User {
  id: string
  name: string
  document: string
  haveDisability: boolean
  class: UserClass | null
  meetings: UserMeeting[]
}

export interface Class {
  id: string
  name: string
}

interface Course {
  id: string
  title: string
}

interface SubscriberListProps {
  course: Course
  users: User[]
  classes: Class[]
}

export default function SubscriberList({
  course,
  users,
  classes,
}: SubscriberListProps) {
  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [queryKey, setQueryKey] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isInitialValue, setIsInitialValue] = useState(true)

  const setToast = useSetAtom(toastState)
  const [courseUser, setCourseUser] = useAtom(courseUsers)

  const { data: usersList, refetch } = useQuery<{
    users: User[]
  }>(
    ['courseUsers', course.id],
    async () => {
      try {
        return await listCourseUsersQuery({
          courseId: course.id,
          queryKey,
        })
      } catch (error: any) {
        const { response } = error as AxiosError<{ message: string }>

        setToast({
          title: 'Ops, temos um problema',
          description: response?.data.message ?? 'Erro ao recuperar usuários.',
          type: 'error',
          isOpen: true,
        })

        return { users }
      }
    },
    { enabled: false, initialData: { users } }
  )

  function handleCleanUpdates() {
    setCourseUser([])
  }

  async function handleUpdateUsers() {
    if (courseUser.length === 0) return
    setIsUpdating(true)

    try {
      await api.put('/courses/enrollments/update', {
        courseUser,
        courseId: course.id,
      })

      setToast({
        title: 'Sucesso',
        description: 'Dados atualizados',
        type: 'success',
        isOpen: true,
      })
    } catch (error: any) {
      const { response } = error as AxiosError<{ message: string }>

      setToast({
        title: 'Ops, temos um problema',
        description: response?.data.message ?? '',
        type: 'error',
        isOpen: true,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (isInitialValue) return setIsInitialValue(false)
    refetch()
  }, [queryKey, refetch])

  return (
    <>
      <NextSeo
        title={`${capitalizeSentence(course.title)} - Inscritos | PLACUR`}
        description="Administre os inscritos deste curso."
      />

      <FunctionsContainer>
        <Searchbar
          placeholder="Pesquisar nome"
          value={name}
          onChange={({ currentTarget }) => setName(currentTarget.value)}
          onSearch={async (event) => {
            event.preventDefault()
            setQueryKey(name)
          }}
        />

        <Searchbar
          placeholder="Pesquisar CPF"
          value={document}
          type="number"
          onChange={({ currentTarget }) => setDocument(currentTarget.value)}
          onSearch={async (event) => {
            event.preventDefault()
            setQueryKey(document)
          }}
        />

        <Button size="min" disabled={isUpdating} onClick={handleUpdateUsers}>
          Salvar alterações
        </Button>

        <Button size="min" variant="secondary" onClick={handleCleanUpdates}>
          Cancelar alterações
        </Button>
      </FunctionsContainer>

      <ListContainer>
        {usersList.users.map((user, index) => {
          if (user.meetings.length === 1) {
            return <SingleMeetingRow key={user.id} index={index} user={user} />
          }
          if (user.meetings.length > 1) {
            return (
              <MultipleMeetingRow key={user.id} index={index} user={user} />
            )
          }
          return (
            <ClassesRow
              key={user.id}
              index={index}
              user={user}
              classes={classes}
            />
          )
        })}
      </ListContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  SubscriberListProps
> = async ({ req, res, params }) => {
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
      enrollments: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              document: true,
              have_hearing_disability: true,
              have_intellectual_disability: true,
              have_physical_disability: true,
              have_psychosocial_disability: true,
              have_visual_disability: true,
            },
          },
        },
        orderBy: { user: { name: 'asc' } },
      },
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

  if (!course) {
    return {
      notFound: true,
    }
  }

  const { enrollments, classes, meetings, ...parsedCourse } = course

  const users = enrollments.map(({ user }) => {
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

  const parsedClasses = classes.map((item) => ({
    id: item.id,
    name: item.name,
  }))

  return {
    props: {
      course: parsedCourse,
      users,
      classes: parsedClasses,
    },
  }
}
