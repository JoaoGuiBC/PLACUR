import { useRouter } from 'next/router'
import { EnvelopeSimple } from 'phosphor-react'

import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { TextInput } from '@components/TextInput'

import { ButtonContainer, Container, Form } from './styles'

export default function ForgotPassword() {
  const { push } = useRouter()

  return (
    <Container>
      <Heading style="secondary">Recuperação de senha.</Heading>

      <Text>
        Informe o seu email, nós iremos te enviar por lá um link para recuperar
        a sua senha
      </Text>

      <Form onSubmit={(e) => e.preventDefault()}>
        <TextInput Icon={EnvelopeSimple} type="email" placeholder="E-Mail" />

        <ButtonContainer>
          <Button type="submit">Enviar</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => push('/login')}
          >
            Voltar
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}
