import { api } from '@lib/axios'

interface ListCoursesData {
  title: string
  axisOfKnowledge: string
  category: string
  skip: number
  take: number
}

interface Course {
  id: string
  title: string
  category: string
  isFinished: boolean
  firstDate: string | null
  lastDate: string | null
}

interface ListCoursesResponse {
  courses: Course[]
  countCourses: number
}

export async function listAllCoursesQuery({
  title,
  axisOfKnowledge,
  category,
  skip,
  take,
}: ListCoursesData) {
  const { data } = await api.get<ListCoursesResponse>('/courses/list-all', {
    params: { title, axisOfKnowledge, category, skip, take },
  })

  return { courses: data.courses, countCourses: data.countCourses }
}
