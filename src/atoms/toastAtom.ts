import { atom } from 'jotai'

interface ToastStateProps {
  title: string
  description: string
  type: 'message' | 'error' | 'success'
  isOpen: boolean
}

export const toastState = atom<ToastStateProps>({
  title: '',
  description: '',
  type: 'message',
  isOpen: false,
})
