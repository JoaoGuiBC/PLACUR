import dayjs from 'dayjs'

import { api } from '@lib/axios'

interface ListUsersData {
  name: string
  document: string
  skip: number
  take: number
}

interface User {
  name: string
  document: string
  id: string
  phone: string
  updated_at: Date
  _count: {
    CourseEnrollment: number
  }
}

interface ListUsersResponse {
  users: User[]
  countUsers: number
}

export async function listUsersQuery({
  name,
  document,
  skip,
  take,
}: ListUsersData) {
  const response = await api.get<ListUsersResponse>('/users/list', {
    params: { name, document, skip, take },
  })

  const parsedUsers = response.data.users.map((user) => {
    return {
      id: user.id,
      document: String(user.document),
      name: String(user.name),
      phone: String(user.phone),
      updated_at: dayjs(user.updated_at!).format('DD[ de ]MMMM[ de ]YYYY'),
      count: {
        enrollments: user._count.CourseEnrollment,
      },
    }
  })

  return { users: parsedUsers, countUsers: response.data.countUsers }
}
