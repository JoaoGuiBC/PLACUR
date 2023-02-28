import Image from 'next/image'
import { NextSeo } from 'next-seo'

import { Button, Heading, Text } from '@components/index'

import {
  Container,
  InfoContainer,
  ImageInfo,
  Section,
  RegisterContainer,
  Encounter,
  DateInfo,
} from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Login() {
  return (
    <>
      <NextSeo
        title="Assistência Farmacêutica no Município de Balneário Camboriú - II | PLACUR"
        description="Curso dedicado a Servidores públicos municipais prescritores (médicos) das
        Unidades Básicas, Especializadas e Serviços de Urgência e
        Emergência (PA, UPA, pronto atendimento HMRC)"
      />

      <Container>
        <InfoContainer>
          <Heading size="lg">
            Assistência Farmacêutica no Município de Balneário Camboriú - II
          </Heading>

          <ImageInfo>
            <Image
              src="/course_image_placeholder.png"
              alt="Assistência Farmacêutica no Município de Balneário Camboriú - II"
              width={160}
              height={160}
            />

            <div>
              <Section>
                <Heading size="md">Público Alvo</Heading>
                <Text size="lg">
                  Servidores públicos municipais prescritores (médicos) das
                  Unidades Básicas, Especializadas e Serviços de Urgência e
                  Emergência (PA, UPA, pronto atendimento HMRC)
                </Text>
              </Section>

              <Section>
                <Heading size="md">Objetivo</Heading>
                <Text size="lg">
                  Ao final do curso o servidor deverá ser capaz de: identificar
                  os diferentes componentes da AF; reconhecer os medicamentos da
                  REMUME e do CEAF; localizar e acessar os documentos
                  necessários para abertura e renovação dos processos do CEAF
                  bem como dominar o preenchimento correto da documentação;
                  preencher formulários de revisão da REMUME elaborados pela
                  CFT.
                </Text>
              </Section>
            </div>
          </ImageInfo>

          <Section>
            <Heading size="md">Observação</Heading>
            <Text size="lg">
              Módulo 1 será ministrado no auditório do NAI (Núcleo de atenção aí
              idoso). Os módulos 2, 3 e 4 serão ministrados na sala 105 na
              faculdade unisul em frente ao Balneario Camboriu Shopping.
            </Text>
          </Section>

          <Section>
            <Heading size="md">Conteúdo programático</Heading>
            <Text size="lg">
              O curso abordará os medicamentos constantes na REMUME, CEAF -
              critérios para inclusão e abertura de processo administrativo e
              abordagens CFT, ele será dividido em quatro modulos, sendo eles:
              MÓDULO 1 - Assistência Farmacêutica para Idosos. MÓDULO 2 -
              Assistência Farmacêutica na Saúde Mental. MÓDULO 3 - Assistência
              Farmacêutica na Saúde da Mulher. MÓDULO 4 - Assistência
              Farmacêutica na Infância e Adolescência
            </Text>
          </Section>

          <Section>
            <Heading size="md">Ministrantes</Heading>
            <Text size="lg" as="p">
              <strong>Patrícia Schlichting</strong> - Graduada em Farmácia em
              1998 pela Universidade Federal de Santa Catarina - UFSC,
              habilitação Análises Clínicas em 2001 pela Universidade do Vale do
              Itajaí – UNIVALI, especialista em Gestão de Assistência
              Farmacêutica em 2012 pela Universidade Aberta do SUS – UNASUS
              Ministério da Saúde em parceria com UFSC, especialista em
              Assistência Farmacêutica Municipal em 2019 pelo Hospital Alemão
              Osvaldo Cruz – HAOC, pós graduada em Análises Clínicas e
              Toxicológicas em 2006 pela Universidade Positivo UNICENP – PR.
            </Text>

            <Text size="lg" as="p">
              <strong>Mileine Mosca Hamedt</strong> - Graduada em Farmácia em
              2011 pela Universidade da Região de Joinville – UNIVILLE,
              especialista MBA Economia e Avaliação de Tecnologias em Saúde em
              2014 pela Fundação Instituto de Pesquisas Econômicas – FIPE.
            </Text>
          </Section>
        </InfoContainer>

        <RegisterContainer>
          <Encounter>
            <Heading size="sm">1º encontro</Heading>
            <DateInfo>26/08/2022 das 13h00 às 15h30</DateInfo>
          </Encounter>

          <Encounter>
            <Heading size="sm">2º encontro</Heading>
            <DateInfo>30/09/2022 das 13h00 às 14h30</DateInfo>
          </Encounter>

          <Button variant="secondary">Faça login para se inscrever</Button>
        </RegisterContainer>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const courseId = String(params?.course_id)

  console.log(courseId)

  return {
    props: {},
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
