import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { UserMinus, X } from 'phosphor-react'

import { maskDocument } from '@utils/inputMasks'
import { capitalizeSentence } from '@utils/capitalize-sentence'
import { courseUsers, CourseUsersProps } from '@atoms/courseUsersAtom'

import { User, Class } from '../index.page'
import { Button, Select, Separator } from '@components/index'
import { UserData, UserInfo, UserName, UserRow } from '../styles'

interface ClassesRowProps {
  index: number
  user: User
  classes: Class[]
}

export function ClassesRow({ index, user, classes }: ClassesRowProps) {
  const [isInitialValue, setIsInitialValue] = useState(true)
  const [currentUser, setCurrentUser] = useState<CourseUsersProps>({
    id: user.id,
    action: 'update',
    meetings: [],
    class: {
      id: user.class!.id,
      old_id: user.class!.id,
      user_was_present: user.class!.user_was_present,
    },
  })

  const [courseUser, setCourseUser] = useAtom(courseUsers)

  function handleChangeUserAttendance() {
    setCurrentUser({
      ...currentUser,
      class: {
        id: currentUser.class!.id,
        old_id: user.class!.id,
        user_was_present: !currentUser.class!.user_was_present,
      },
    })
  }

  function handleChangeUserClass(classId: string) {
    setCurrentUser({
      ...currentUser,
      class: {
        id: classId,
        old_id: user.class!.id,
        user_was_present: currentUser.class!.user_was_present,
      },
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
        meetings: [],
        class: {
          id: user.class!.id,
          old_id: user.class!.id,
          user_was_present: user.class!.user_was_present,
        },
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

        <Select
          emptyValue="Selecione uma turma"
          defaultValue={user.class?.id}
          content={classes.map((item) => ({ value: item.id, text: item.name }))}
          onValueChange={(value) => handleChangeUserClass(value)}
          value={currentUser.class?.id}
        />

        <Button
          size="min"
          variant={
            currentUser.class!.user_was_present ? 'secondary' : 'primary'
          }
          onClick={handleChangeUserAttendance}
        >
          {currentUser.class!.user_was_present
            ? 'Remover presença'
            : 'Marcar presença'}
        </Button>

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
