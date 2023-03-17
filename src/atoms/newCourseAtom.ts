import { atom } from 'jotai'

interface Minister {
  name: string
  qualification: string
}

interface Meeting {
  date: Date
  startTime: number
  endTime: number
}

interface Class {
  name: string
  date: Date
  startTime: number
  endTime: number
}

interface NewCourseProps {
  title: string
  targetAudience: string
  objective: string
  observations: string
  content: string
  ministers: Minister[]
  axesOfKnowledge: string[]
  category: string
  meetings: Meeting[]
  classes: Class[]
}

export const newCourse = atom<NewCourseProps>({
  title: '',
  targetAudience: '',
  objective: '',
  observations: '',
  content: '',
  ministers: [],
  axesOfKnowledge: [],
  category: '',
  meetings: [],
  classes: [],
})
