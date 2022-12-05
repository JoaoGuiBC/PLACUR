import { CourseCard } from "../components/CourseCard";

export default function Home() {
  return (
    <div>

      <CourseCard
        image="/course_image_placeholder.png"
        title="Formação Continuada Multiprofissional da equipe de visitadores dos Programas Bem-Estar da Família e Criança Feliz MODULO XVII"
        firstDate="16/11/2022"
        lastDate="16/11/2022"
        availability={12}
        finished={false}
        category="Workshop"
      />
      <CourseCard
        image="/course_image_placeholder.png"
        title="Primeiras intervenções nas urgências e emergências no ambiente escolar - SEDUC"
        firstDate="26/08/2022"
        lastDate="23/11/2022"
        availability={91}
        finished={false}
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
    </div>
  )
}
