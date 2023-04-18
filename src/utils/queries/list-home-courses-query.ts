import { api } from '@lib/axios'
import { Categories } from '@components/CourseCard'

interface ListCoursesData {
  title: string
  axisOfKnowledge: string
}

interface Course {
  id: string
  title: string
  end_date: string
  initial_date: string
  image: string | null
  category: Categories
}

interface ListCoursesResponse {
  ongoingCourses: Course[]
  finishedCourses: Course[]
}

export async function listHomeCoursesQuery({
  title,
  axisOfKnowledge,
}: ListCoursesData) {
  const { data } = await api.get<ListCoursesResponse>('/courses/list-home', {
    params: { title, axisOfKnowledge },
  })

  return {
    ongoingCourses: data.ongoingCourses,
    finishedCourses: data.finishedCourses,
  }
}
