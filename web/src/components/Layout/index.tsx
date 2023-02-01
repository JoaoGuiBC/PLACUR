import type { ReactNode } from 'react'

import { Footer } from '../Footer'
import { Header } from '../Header'

import { Container } from './styles'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
