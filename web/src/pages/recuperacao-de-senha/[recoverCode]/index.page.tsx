import { LockKey } from 'phosphor-react'

import { Button } from '../../../components/Button'
import { TextInput } from '../../../components/TextInput'
import { SectionTitle } from '../../../components/SectionTitle'

import { Container, Form, Span, InputContainer } from './styles'

export default function RecoverPassword() {
  return (
    <Container>
      <SectionTitle style="secondary">Prontinho.</SectionTitle>

      <Span>Por favor, insira a sua nova senha</Span>

      <Form onSubmit={(e) => e.preventDefault()}>
        <InputContainer>
          <TextInput Icon={LockKey} type="password" placeholder="Senha" />
          <TextInput
            Icon={LockKey}
            type="password"
            placeholder="Repita a senha"
          />
        </InputContainer>

        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  )
}
