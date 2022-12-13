import { EnvelopeSimple, GlobeHemisphereWest, IdentificationBadge, IdentificationCard, Phone } from "phosphor-react"

import { Avatar } from "../../../components/Avatar"
import { Select } from "../../../components/Select"
import { Button } from "../../../components/Button"
import { Checkbox } from "../../../components/Checkbox"
import { TextInput } from "../../../components/TextInput"
import { SectionTitle } from "../../../components/SectionTitle"
import { UpdatePasswordDialog } from "../../../components/Dialogs/UpdatePasswordDialog"

import { theme } from "../../../../stitches.config"
import {
  Container,
  PageHeader,
  Label,
  Content,
  UserInfoContainer,
  UserInfoSection,
  Title
} from './styles'

const cityHallDivisions = [
  { value: 'secretaria-de-educacao', text: 'Secretaria de Educação' },
  { value: 'secretaria-de-gestao-administrativa', text: 'Secretaria de Gestão Administrativa' },
  { value: 'fundacao-cultural', text: 'Fundação Cultural' }
]

export default function Perfil() {
  return (
    <Container>
      <PageHeader>
        <input type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" id="userImage" />
        <Label htmlFor="userImage">
          <Avatar src="https://github.com/JoaoGuiBC.png" />
          <span>Trocar imagem</span>
        </Label>
        <SectionTitle style="secondary">João Guilherme Da Rocha</SectionTitle>
      </PageHeader>

      <Content>
        <UserInfoContainer>
          <UserInfoSection>
            <Title>Dados de login</Title>

            <TextInput Icon={EnvelopeSimple} placeholder="E-Mail" />

            <UpdatePasswordDialog />
          </UserInfoSection>

          <UserInfoSection>
            <Title>Dados pessoais</Title>

            <TextInput Icon={IdentificationBadge} placeholder="Nome completo" />
            <TextInput Icon={IdentificationCard} placeholder="CPF" />
            <TextInput Icon={Phone} placeholder="Telefone" />
          </UserInfoSection>

          <UserInfoSection>
            <Checkbox title="Você é funcionário público de Balneário Camboriú?" />

            <Select emptyValue="Em qual secretaria você trabalha?" content={cityHallDivisions} />
          </UserInfoSection>

          <Checkbox title="Essa pessoa é administradora da plataforma?" />
        </UserInfoContainer>

        <UserInfoContainer>
          <UserInfoSection>
            <Title>Endereço</Title>

            <TextInput Icon={GlobeHemisphereWest} placeholder="Endereço" />
            <TextInput Icon={GlobeHemisphereWest} placeholder="Bairro" />
            <TextInput Icon={GlobeHemisphereWest} placeholder="Cidade" />
          </UserInfoSection>

          <UserInfoSection>
            <Title>Zona de risco</Title>

            <Button variant="secondary" size="min" css={{ $$baseColor: theme.colors.red500.value }}>
              Deletar conta
            </Button>
          </UserInfoSection>
        </UserInfoContainer>
      </Content>
      <Button size="min">
        Salvar alterações
      </Button>
    </Container>
  )
}