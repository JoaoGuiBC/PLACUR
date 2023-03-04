import { IdentificationBadge, IdentificationCard, Phone } from 'phosphor-react'

import { Button, Heading, Text, TextInput } from '@components/index'

import { FormContainer, HeaderContainer } from '../styles'

export function PersonalInfoHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Nos conte quem você é!</Heading>

      <Text size="lg">
        Precisamos de algumas informações para criar seu perfil! Você pode
        editar essas informações depois.
      </Text>
    </HeaderContainer>
  )
}

export function PersonalInfoForm() {
  return (
    <FormContainer>
      <TextInput Icon={IdentificationBadge} placeholder="Nome completo" />
      <TextInput Icon={IdentificationCard} placeholder="CPF" />
      <TextInput Icon={Phone} placeholder="Telefone" />

      <Button>Próximo passo</Button>
    </FormContainer>
  )
}
