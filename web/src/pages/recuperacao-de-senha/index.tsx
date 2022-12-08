import { useRouter } from "next/router"
import { EnvelopeSimple } from "phosphor-react"

import { Button } from "../../components/Button"
import { TextInput } from "../../components/TextInput"
import { SectionTitle } from "../../components/SectionTitle"

import { ButtonContainer, Container, Form, Span } from "./styles"

export default function ForgotPassword() {
  const { push } = useRouter()

  return (
    <Container>
      <SectionTitle style="secondary">Recuperação de senha.</SectionTitle>

      <Span>Informe o seu email, nós iremos te enviar por lá um link para recuperar a sua senha</Span>

      <Form onSubmit={(e) => e.preventDefault()}>
        <TextInput Icon={EnvelopeSimple} type="email" placeholder="E-Mail" />

        <ButtonContainer>
          <Button type="submit">Enviar</Button>
          <Button type="button" variant="secondary" onClick={() => push('/login')}>Voltar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}
