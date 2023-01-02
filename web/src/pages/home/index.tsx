import { Select } from "../../components/Select"
import { Searchbar } from "../../components/Searchbar"
import { CourseCard } from "../../components/CourseCard"
import { SectionTitle } from "../../components/SectionTitle"

import { CoursesContainer, FilterContainer } from "./styles"

const axesOfKnowledge = [
  { value: 'aposentadoria-e-previdencia', text: 'Aposentadoria e Previdência' },
  { value: 'compras-publicas', text: 'Compras Públicas' },
  { value: 'comunicacao', text: 'Comunicação' },
  { value: 'desenvolvimento-pessoal', text: 'Desenvolvimento Pessoal' },
  { value: 'direito-e-legislacao', text: 'Direito e Legislação' },
  { value: 'educacao-e-docencia', text: 'Educação e Docência' },
  { value: 'etica-e-cidadania', text: 'Ética e Cidadania' },
  { value: 'gestao-da-informacao-e-do-conhecimento', text: 'Gestão da Informação e do Conhecimento' },
  { value: 'gestao-de-pessoas', text: 'Gestão de Pessoas' },
  { value: 'gestao-publica-e-de-politicas-publicas', text: 'Gestão Pública e de Políticas Públicas' },
  { value: 'tecnologia-da-informacao-e-inovacao', text: 'Tecnologia da Informação e Inovação' },
  { value: 'infraestrutura-e-logistica', text: 'Infraestrutura e Logística' },
  { value: 'meio-ambiente', text: 'Meio Ambiente' },
  { value: 'politicas-sociais', text: 'Políticas Sociais' },
  { value: 'politicas-de-saude-e-esporte', text: 'Políticas de Saúde e Esporte' },
  { value: 'seguranca-publica-e-transito', text: 'Segurança Pública e Trânsito' },
  { value: 'transparencia-controle-e-participacao', text: 'Transparência, Controle e Participação' },
  { value: 'turismo-e-cultura', text: 'Turismo e Cultura' }
]

export default function Home() {
  return (
    <>
      <FilterContainer>
        <Searchbar placeholder="Buscar curso" />
        <Select emptyValue="Filtrar por eixo de conhecimento" content={axesOfKnowledge} />
      </FilterContainer>

      <SectionTitle>Cursos com inscrições abertas</SectionTitle>
      <CoursesContainer>
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
      </CoursesContainer>

      <SectionTitle>Cursos Finalizados</SectionTitle>
      <CoursesContainer>
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
      </CoursesContainer>
    </>
  )
}
