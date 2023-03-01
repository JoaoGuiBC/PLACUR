import { z } from 'zod'
import { NextSeo } from 'next-seo'
import { signIn } from 'next-auth/react'
import { EnvelopeSimple } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Text, Button, Heading, TextInput } from '@components/index'

import { ButtonContainer, Container, Form, InputContainer } from './styles'
import { useForm } from 'react-hook-form'

const informEmailFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, informe um e-mail válido.' }),
})

type InformEmailFormData = z.infer<typeof informEmailFormSchema>

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InformEmailFormData>({
    resolver: zodResolver(informEmailFormSchema),
  })

  async function handleLogin({ email }: InformEmailFormData) {
    signIn('email', { email })
  }

  return (
    <>
      <NextSeo
        title="Login | PLACUR"
        description="Informe suas credenciais para entrar na plataforma."
      />

      <Container>
        <Heading style="secondary">Estamos quase lá.</Heading>

        <Text>
          Informe o seu e-mail, caso não tenha uma conta ela será criada
          automaticamente.
        </Text>

        <Form onSubmit={handleSubmit(handleLogin)}>
          <InputContainer>
            <TextInput
              Icon={EnvelopeSimple}
              type="email"
              placeholder={
                errors.email ? `E-mail - ${errors.email.message}` : 'E-mail'
              }
              {...register('email')}
            />
          </InputContainer>

          <ButtonContainer>
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </>
  )
}
