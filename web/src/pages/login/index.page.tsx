import Link from 'next/link'
import { EnvelopeSimple, LockKey } from 'phosphor-react'

import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { TextInput } from '@components/TextInput'

import { ButtonContainer, Container, Form, InputContainer } from './styles'

export default function Login() {
  return (
    <Container>
      <Heading style="secondary">Estamos quase lá.</Heading>

      <Text>Faça seu login para começar a acessar os cursos</Text>

      <Form onSubmit={(e) => e.preventDefault()}>
        <InputContainer>
          <TextInput Icon={EnvelopeSimple} type="email" placeholder="E-Mail" />
          <TextInput Icon={LockKey} type="password" placeholder="Senha" />
        </InputContainer>

        <Link href="/recuperacao-de-senha">
          <Text>Esqueci minha senha</Text>
        </Link>

        <ButtonContainer>
          <Button type="submit">Login</Button>
          <Button type="button" variant="secondary">
            Criar conta
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}