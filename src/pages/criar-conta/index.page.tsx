import { NextSeo } from 'next-seo'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'

import { MultiStep } from '@components/index'
import { authOptions } from '@api/auth/[...nextauth].api'

import {
  HaveDisabilityStepForm,
  HaveDisabilityStepHeader,
} from './HaveDisabilityStep'
import { AddressStepForm, AddressStepHeader } from './AddressStep'
import { PersonalInfoForm, PersonalInfoHeader } from './PersonalInfoStep'

import { Container } from './styles'

export default function CreateAccount() {
  return (
    <>
      <NextSeo
        title="Criar conta | PLACUR"
        description="Complete o formulario para finalizar a sua conta."
      />

      <Container>
        <PersonalInfoHeader />

        <MultiStep size={3} currentStep={3} />

        <PersonalInfoForm />
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
