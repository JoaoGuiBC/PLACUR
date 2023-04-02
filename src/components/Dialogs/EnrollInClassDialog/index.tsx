import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { X } from 'phosphor-react'
import { AxiosError } from 'axios'
import * as Dialog from '@radix-ui/react-dialog'

import { api } from '@lib/axios'
import { toastState } from '@atoms/toastAtom'

import { Button } from '../../Button'
import { Select } from '../../Select'

import { theme } from 'stitches.config'
import { CloseButton, DialogContent, DialogOverlay } from './styles'

interface EnrollInClassDialogProps {
  userId: string
  courseId: string
  onEnroll: (value: boolean) => void
  options: { value: string; text: string }[]
}

function EnrollInClassDialog({
  options,
  courseId,
  userId,
  onEnroll,
}: EnrollInClassDialogProps) {
  const [selectedClass, setSelectedClass] = useState('')

  const setToast = useSetAtom(toastState)

  async function handleEnroll() {
    if (!selectedClass) {
      return
    }

    onEnroll(true)

    try {
      await api.post('/courses/enrollments', {
        courseId,
        userId,
        chosenClass: selectedClass,
      })

      const className = options
        .filter((item) => item.value === selectedClass)
        .map((item) => item.text)

      setToast({
        title: 'Uhuu!',
        description: `A sua inscrição foi realizada em ${className[0]}!`,
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
      onEnroll(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Me inscreva</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <Select
            emptyValue="Escolha uma turma"
            content={options}
            onValueChange={setSelectedClass}
          />

          <Dialog.Close asChild>
            <Button type="button" onClick={handleEnroll}>
              Increver
            </Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <CloseButton aria-label="Close">
              <X size={16} color={theme.colors.gray900.value} weight="light" />
            </CloseButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

EnrollInClassDialog.displayName = 'EnrollInClassDialog'

export { EnrollInClassDialog }
