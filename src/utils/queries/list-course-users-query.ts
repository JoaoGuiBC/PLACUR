import { User } from '@pages/admin/curso/[course_id]/lista-de-inscritos/index.page'
import { api } from '@lib/axios'

interface ListCourseUsersData {
  courseId: string
  queryKey: string
}

interface ListCourseUsersResponse {
  users: User[]
}

export async function listCourseUsersQuery({
  queryKey,
  courseId,
}: ListCourseUsersData) {
  const response = await api.get<ListCourseUsersResponse>(
    '/courses/enrollments/get-users',
    {
      params: {
        queryKey,
        courseId,
      },
    }
  )

  return { users: response.data.users }
}
