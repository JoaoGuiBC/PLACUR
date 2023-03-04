import { GlobeHemisphereWest } from 'phosphor-react'

import { Button, Heading, Text, TextInput } from '@components/index'

import { FormContainer, HeaderContainer } from '../styles'

export function AddressStepHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Onde você mora?</Heading>

      <Text size="lg">
        Precisamos de algumas informações para criar seu perfil. Você pode
        editar essas informações depois.
      </Text>
    </HeaderContainer>
  )
}

export function AddressStepForm() {
  return (
    <FormContainer>
      <TextInput Icon={GlobeHemisphereWest} placeholder="Endereço" />
      <TextInput Icon={GlobeHemisphereWest} placeholder="Bairro" />
      <TextInput Icon={GlobeHemisphereWest} placeholder="Cidade" />

      <Button>Próximo passo</Button>
    </FormContainer>
  )
}
