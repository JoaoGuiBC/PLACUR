import { Select } from '@components/Select'
import { Button } from '@components/Button'
import { Searchbar } from '@components/Searchbar'
import { CourseCard } from '@components/CourseCard'
import { Pagination } from '@components/Pagination'

import {
  axesOfKnowledge,
  courseCategories,
  courseStatus,
} from '@utils/selectValues'

import { ActionsContainer, CoursesContainer } from './styles'

export default function AppCourses() {
  return (
    <>
      <ActionsContainer>
        <Searchbar placeholder="Buscar curso" />
        <Select
          content={axesOfKnowledge}
          emptyValue="Filtrar por eixo de conhecimento"
        />
        <Select content={courseCategories} emptyValue="Filtrar por categoria" />
        <Select
          content={courseStatus}
          emptyValue="Filtrar por estado de conclusão"
        />
        <Button size="min">Adicionar um curso</Button>
      </ActionsContainer>

      <Pagination
        totalCountOfRegisters={20}
        currentPage={1}
        registerPerPage={12}
      />

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
          title="Primeiras intervenções nas urgências e emergências no ambiente laboral - Inclusão Social"
          firstDate="24/10/2022"
          lastDate="24/10/2022"
          availability={0}
          finished
          category="Capacitação"
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
    </>
  )
}
