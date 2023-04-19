import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { UserMinus, X } from 'phosphor-react'

import { maskDocument } from '@utils/inputMasks'
import { capitalizeSentence } from '@utils/capitalize-sentence'
import { courseUsers, CourseUsersProps } from '@atoms/courseUsersAtom'

import { User } from '../index.page'
import { Button, Separator, Text } from '@components/index'
import {
  UserAttendanceContainer,
  UserData,
  UserInfo,
  UserName,
  UserRow,
} from '../styles'

interface MultipleMeetingRowProps {
  index: number
  user: User
}

export function MultipleMeetingRow({ index, user }: MultipleMeetingRowProps) {
  const [isInitialValue, setIsInitialValue] = useState(true)
  const [currentUser, setCurrentUser] = useState<CourseUsersProps>({
    id: user.id,
    action: 'update',
    meetings: user.meetings,
    class: null,
  })

  const [courseUser, setCourseUser] = useAtom(courseUsers)

  function handleChangeUserAttendance(meetId: string) {
    setCurrentUser({
      ...currentUser,
      meetings: currentUser.meetings.map((meet) => ({
        id: meet.id,
        user_was_present:
          meet.id === meetId ? !meet.user_was_present : meet.user_was_present,
      })),
    })
  }

  function handleDeleteUser() {
    if (currentUser.action === 'update') {
      setCurrentUser({
        ...currentUser,
        action: 'delete',
      })
    } else {
      setCurrentUser({
        ...currentUser,
        action: 'update',
      })
    }
  }

  useEffect(() => {
    if (isInitialValue) {
      return
    }

    if (courseUser.length === 0) {
      setIsInitialValue(true)
      setCurrentUser({
        id: user.id,
        action: 'update',
        meetings: user.meetings,
        class: null,
      })
    }
  }, [courseUser])

  useEffect(() => {
    if (isInitialValue) {
      setIsInitialValue(false)

      return
    }

    const isUserAlreadyInList = courseUser.find(
      (item) => item.id === currentUser.id
    )

    if (isUserAlreadyInList) {
      setCourseUser([
        ...courseUser.filter((item) => item.id !== currentUser.id),
        currentUser,
      ])
    } else {
      setCourseUser([...courseUser, currentUser])
    }
  }, [currentUser, setCourseUser])

  return (
    <>
      {index !== 0 && <Separator css={{ $$baseColor: '$colors$gray800' }} />}

      <UserRow>
        <UserData>
          <UserName size="lg">{capitalizeSentence(user.name)}</UserName>
          <UserInfo>{maskDocument(user.document)}</UserInfo>
          {user.haveDisability && (
            <UserInfo>Possui alguma deficiência</UserInfo>
          )}
        </UserData>

        {currentUser.meetings.map((meet, index) => (
          <UserAttendanceContainer key={meet.id}>
            <Text size="lg">{`${index + 1}º Encontro`}</Text>
            <Button
              size="min"
              variant={meet.user_was_present ? 'secondary' : 'primary'}
              onClick={() => handleChangeUserAttendance(meet.id)}
            >
              {meet.user_was_present ? 'Remover presença' : 'Marcar presença'}
            </Button>
          </UserAttendanceContainer>
        ))}

        <Button
          size="min"
          variant="withIcon"
          onClick={handleDeleteUser}
          css={{ $$baseColor: '$colors$red500' }}
        >
          {currentUser.action === 'update' ? (
            <UserMinus size={32} />
          ) : (
            <X size={32} />
          )}
        </Button>
      </UserRow>
    </>
  )
}
