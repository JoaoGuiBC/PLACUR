import { NextSeo } from 'next-seo'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'

import { authOptions } from '@api/auth/[...nextauth].api'
import { Heading } from '@components/index'

import { Container } from './styles'

export default function CreateAccount() {
  return (
    <>
      <NextSeo title="Criar conta - passo 1 | PLACUR" description="" />

      <Container>
        <Heading style="secondary">Criar Conta.</Heading>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  if (session) {
    if (session.user?.name) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {},
      }
    }
  }

  return { props: {} }
}
