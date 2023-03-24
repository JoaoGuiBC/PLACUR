import {
  EnvelopeSimple,
  GlobeHemisphereWest,
  IdentificationBadge,
  IdentificationCard,
  Phone,
} from "phosphor-react";
import { NextSeo } from "next-seo";

import {
  Text,
  Avatar,
  Button,
  Heading,
  Checkbox,
  TextInput,
} from "@components/index";


import { theme } from "stitches.config";
import {
  Container,
  PageHeader,
  Label,
  Content,
  UserInfoContainer,
  UserInfoSection,
} from "./styles";

export default function Perfil() {
  return (
    <>
      <NextSeo
        title="Joao Guilherme Da Rocha | PLACUR"
        description="Todas as informações pertinentes a sua conta."
      />

      <Container>
        <PageHeader>
          <input
            type="file"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            id="userImage"
          />
          <Label htmlFor="userImage">
            <Avatar src="https://github.com/JoaoGuiBC.png" />
            <Text size="sm">Trocar imagem</Text>
          </Label>
          <Heading style="secondary">João Guilherme Da Rocha</Heading>
        </PageHeader>

        <Content>
          <UserInfoContainer>
            <UserInfoSection>
              <Text as="h2" size="lg">
                Dados de login
              </Text>

              <TextInput Icon={EnvelopeSimple} placeholder="E-Mail" />
            </UserInfoSection>

            <UserInfoSection>
              <Text as="h2" size="lg">
                Dados pessoais
              </Text>

              <TextInput
                Icon={IdentificationBadge}
                placeholder="Nome completo"
              />
              <TextInput Icon={IdentificationCard} placeholder="CPF" />
              <TextInput Icon={Phone} placeholder="Telefone" />
            </UserInfoSection>

            <Checkbox title="Essa pessoa é administradora da plataforma?" />
          </UserInfoContainer>

          <UserInfoContainer>
            <UserInfoSection>
              <Text as="h2" size="lg">
                Endereço
              </Text>

              <TextInput Icon={GlobeHemisphereWest} placeholder="Endereço" />
              <TextInput Icon={GlobeHemisphereWest} placeholder="Bairro" />
              <TextInput Icon={GlobeHemisphereWest} placeholder="Cidade" />
            </UserInfoSection>

            <UserInfoSection>
              <Text as="h2" size="lg">
                Zona de risco
              </Text>

              <Button
                variant="secondary"
                size="min"
                css={{ $$baseColor: theme.colors.red500.value }}
              >
                Deletar conta
              </Button>
            </UserInfoSection>
          </UserInfoContainer>
        </Content>
        <Button size="min">Salvar alterações</Button>
      </Container>
    </>
  );
}
