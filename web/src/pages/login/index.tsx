import { EnvelopeSimple, LockKey } from "phosphor-react"

import { TextInput } from "../../components/TextInput"
import { SectionTitle } from "../../components/SectionTItle"

import { Container } from "./styles"

export default function Login() {
  return (
    <Container>
      <SectionTitle style="secondary">Estamos quase lá.</SectionTitle>

      <TextInput Icon={EnvelopeSimple} type="email" />
      <TextInput Icon={LockKey} type="password" />
    </Container>
  )
}