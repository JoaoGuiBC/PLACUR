import { NextSeo } from 'next-seo'

import { Heading, CourseCard } from '@components/index'

import {
  Container,
  QuantityInfoContainer,
  Separator,
  CoursesContainer,
  CoursesSection,
} from './styles'

export default function MyCourses() {
  return (
    <>
      <NextSeo
        title="Meus cursos | PLACUR"
        description="Lista com todas as informações sobre os cursos nos quais você está inscrito."
      />
      <Container>
        <Heading>Meus cursos</Heading>

        <QuantityInfoContainer>
          <Heading as="strong" size="md" style="secondary">
            Cursos inscritos: 4
          </Heading>

          <Separator decorative />

          <Heading as="strong" size="md" style="secondary">
            Cursos finalizados: 3
          </Heading>
        </QuantityInfoContainer>

        <CoursesContainer>
          <CoursesSection>
            <Heading as="h2" size="sm">
              CURSOS ABERTOS
            </Heading>

            <CourseCard
              image="/course_image_placeholder.png"
              title="Formação Continuada Multiprofissional da equipe de visitadores dos Programas Bem-Estar da Família e Criança Feliz MODULO XVII"
              firstDate="16/11/2022"
              lastDate="16/11/2022"
              availability={12}
              category="Workshop"
            />
            <CourseCard
              image="/course_image_placeholder.png"
              title="Assistência Farmacêutica no Município de Balneário Camboriú - II"
              firstDate="26/08/2022"
              lastDate="25/11/2022"
              availability={1}
              category="Workshop"
            />
            <CourseCard
              image="/course_image_placeholder.png"
              title="Primeiras intervenções nas urgências e emergências no ambiente escolar - SEDUC"
              firstDate="26/08/2022"
              lastDate="23/11/2022"
              availability={91}
              category="Capacitação"
            />
            <CourseCard
              image="/course_image_placeholder.png"
              title="Boas Práticas nos Serviços de Alimentação na Execução do PNAE no Município de Balneário Camboriú/SC"
              firstDate="1/03/2022"
              lastDate="1/12/2023"
              category="EAD"
            />
          </CoursesSection>

          <CoursesSection>
            <Heading as="h2" size="sm">
              CURSOS FINALIZADOS
            </Heading>

            <CourseCard
              image="/course_image_placeholder.png"
              title="Primeiras intervenções nas urgências e emergências no ambiente laboral - Inclusão Social"
              firstDate="24/10/2022"
              lastDate="24/10/2022"
              availability={0}
              finished
              category="Capacitação"
            />
            <CourseCard
              image="/course_image_placeholder.png"
              title="Anestesiologia"
              firstDate="29/09/22"
              lastDate="29/09/22"
              availability={0}
              finished
              category="Palestra"
            />
            <CourseCard
              image="/course_image_placeholder.png"
              title="Formação Continuada Multiprofissional da equipe de visitadores dos Programas Bem-Estar da Família e Criança Feliz MODULO XVI"
              firstDate="27/10/2022"
              lastDate="27/10/2022"
              availability={0}
              finished
              category="Workshop"
            />
          </CoursesSection>
        </CoursesContainer>
      </Container>
    </>
  )
}
