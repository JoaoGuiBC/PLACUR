import { z } from 'zod'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@lib/axios'
import { Button, Checkbox, Heading, Text } from '@components/index'

import { FormContainer, HeaderContainer } from '../styles'

const disabilityFormSchema = z.object({
  visualDisability: z.boolean(),
  physicalDisability: z.boolean(),
  hearingDisability: z.boolean(),
  intellectualDisability: z.boolean(),
  psychosocialDisability: z.boolean(),
})

export type DisabilityFormData = z.infer<typeof disabilityFormSchema>

export function HaveDisabilityStepForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DisabilityFormData>({
    resolver: zodResolver(disabilityFormSchema),
    defaultValues: {
      visualDisability: false,
      physicalDisability: false,
      hearingDisability: false,
      intellectualDisability: false,
      psychosocialDisability: false,
    },
  })

  const router = useRouter()

  async function handleSubmitDisability(data: DisabilityFormData) {
    await api.put('/users/update-profile/disabilities', { ...data })

    router.push('/')
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleSubmitDisability)}>
      <Controller
        name={'visualDisability'}
        control={control}
        render={({ field }) => {
          return (
            <Checkbox
              title="Visual"
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true)
              }}
            />
          )
        }}
      />
      <Controller
        name={'physicalDisability'}
        control={control}
        render={({ field }) => {
          return (
            <Checkbox
              title="Física"
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true)
              }}
            />
          )
        }}
      />
      <Controller
        name={'hearingDisability'}
        control={control}
        render={({ field }) => {
          return (
            <Checkbox
              title="Auditiva"
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true)
              }}
            />
          )
        }}
      />
      <Controller
        name={'intellectualDisability'}
        control={control}
        render={({ field }) => {
          return (
            <Checkbox
              title="Intelectual"
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true)
              }}
            />
          )
        }}
      />
      <Controller
        name={'psychosocialDisability'}
        control={control}
        render={({ field }) => {
          return (
            <Checkbox
              title="Psicosocial"
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true)
              }}
            />
          )
        }}
      />

      <Button disabled={isSubmitting}>Finalizar</Button>
    </FormContainer>
  )
}

export function HaveDisabilityStepHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Você possui alguma deficiência?</Heading>

      <Text size="lg">
        Precisamos de algumas informações para criar seu perfil! Você pode
        editar essas informações depois.
      </Text>
    </HeaderContainer>
  )
}
