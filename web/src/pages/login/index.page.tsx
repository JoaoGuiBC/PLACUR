import Link from 'next/link'
import { EnvelopeSimple, LockKey } from 'phosphor-react'

import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'
import { SectionTitle } from '../../components/SectionTitle'

import {
  ButtonContainer,
  Container,
  Form,
  InputContainer,
  Span,
} from './styles'

export default function Login() {
  return (
    <Container>
      <SectionTitle style="secondary">Estamos quase lá.</SectionTitle>

      <Span>Faça seu login para começar a acessar os cursos</Span>

      <Form onSubmit={(e) => e.preventDefault()}>
        <InputContainer>
          <TextInput Icon={EnvelopeSimple} type="email" placeholder="E-Mail" />
          <TextInput Icon={LockKey} type="password" placeholder="Senha" />
        </InputContainer>

        <Link href="/recuperacao-de-senha">
          <Span>Esqueci minha senha</Span>
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
