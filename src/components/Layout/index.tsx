import { useAtom } from 'jotai'
import type { ReactNode } from 'react'

import { Toast } from '../Toast'
import { Footer } from '../Footer'
import { Header } from '../Header'

import { toastState } from '@atoms/toastAtom'

import { Container } from './styles'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [toastData, setToastData] = useAtom(toastState)

  function handleCloseToast() {
    setToastData({ ...toastData, isOpen: false })
  }

  return (
    <>
      <Toast
        title={toastData.title}
        description={toastData.description}
        type={toastData.type}
        isOpen={toastData.isOpen}
        onClose={handleCloseToast}
      />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
