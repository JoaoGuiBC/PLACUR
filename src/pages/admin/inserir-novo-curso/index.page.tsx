import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useAtom, useSetAtom } from 'jotai'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'
import { useCallback, useEffect, useState } from 'react'

import { api } from '@lib/axios'
import { MultiStep } from '@components/index'
import { toastState } from '@atoms/toastAtom'
import { newCourse } from '@atoms/newCourseAtom'
import { authOptions } from '@api/auth/[...nextauth].api'

import { BasicInfoForm, BasicInfoHeader } from './BasicInfoStep'
import { DataInfoForm, DataInfoHeader } from './DataInfoStep'
import { MinisterInfoForm, MinisterInfoHeader } from './MinisterInfoStep'
import { SelectAxesForm, SelectAxesHeader } from './SelectAxesStep'
import { SetCategoryForm, SetCategoryHeader } from './SetCategoryStep'

import { Container } from './styles'
import { useRouter } from 'next/router'

export default function InsertNewCourse() {
  const [currentStep, setCurrentStep] = useState(1)

  const [course] = useAtom(newCourse)
  const setToast = useSetAtom(toastState)

  const router = useRouter()

  const handleCreateCourse = useCallback(async () => {
    try {
      await api.post('/courses/insert', { ...course })

      router.push('/admin/cursos-da-plataforma')
    } catch (error: any) {
      const { response } = error as AxiosError<{ message: string }>

      setToast({
        title: 'Ops, temos um problema',
        description: response?.data.message ?? '',
        type: 'error',
        isOpen: true,
      })
    }
  }, [course])

  useEffect(() => {
    if (course.category) {
      handleCreateCourse()
    }
  }, [course, handleCreateCourse])

  return (
    <>
      <NextSeo
        title="Inserir curso | PLACUR"
        description="Preencha o formulario para inserir um novo curso."
      />

      <Container>
        {currentStep === 1 && <BasicInfoHeader />}
        {currentStep === 2 && <DataInfoHeader />}
        {currentStep === 3 && <MinisterInfoHeader />}
        {currentStep === 4 && <SelectAxesHeader />}
        {currentStep === 5 && <SetCategoryHeader />}

        <MultiStep size={5} currentStep={currentStep} />

        {currentStep === 1 && <BasicInfoForm onCompleteStep={setCurrentStep} />}
        {currentStep === 2 && <DataInfoForm onCompleteStep={setCurrentStep} />}
        {currentStep === 3 && (
          <MinisterInfoForm onCompleteStep={setCurrentStep} />
        )}
        {currentStep === 4 && (
          <SelectAxesForm onCompleteStep={setCurrentStep} />
        )}
        {currentStep === 5 && <SetCategoryForm />}
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      notFound: true,
    }
  }

  if (!session.user.is_admin) {
    return {
      notFound: true,
    }
  }

  return { props: {} }
}
