import { LockKey } from 'phosphor-react'

import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { TextInput } from '@components/TextInput'

import { Container, Form, InputContainer } from './styles'

export default function RecoverPassword() {
  return (
    <Container>
      <Heading style="secondary">Prontinho.</Heading>

      <Text>Por favor, insira a sua nova senha</Text>

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
