import { atom } from 'jotai'

interface UserMeeting {
  id: string
  user_was_present: boolean
}

interface UserClass {
  id: string
  old_id: string
  user_was_present: boolean
}

export interface CourseUsersProps {
  id: string
  meetings: UserMeeting[]
  class: UserClass | null
  action: 'update' | 'delete'
}

export const courseUsers = atom<CourseUsersProps[]>([])
