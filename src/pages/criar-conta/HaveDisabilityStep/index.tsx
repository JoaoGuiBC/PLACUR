import { Button, Checkbox, Heading, Text } from '@components/index'

import { FormContainer, HeaderContainer } from '../styles'

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

export function HaveDisabilityStepForm() {
  return (
    <FormContainer>
      <Checkbox title="Visual" />
      <Checkbox title="Física" />
      <Checkbox title="Auditiva" />
      <Checkbox title="Intelectual" />
      <Checkbox title="Psicosocial" />

      <Button>Finalizar</Button>
    </FormContainer>
  )
}
