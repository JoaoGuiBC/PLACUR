import { CourseCard } from "../components/CourseCard";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>

      <CourseCard
        image="https://github.com/vercel.png"
        title="Formação Continuada Multiprofissional da equipe de visitadores dos Programas Bem-Estar da Família e Criança Feliz MODULO XVII"
        firstDate="16/11/2022"
        lastDate="16/11/2022"
        availability={12}
        finished={false}
      />
      <CourseCard
        image="https://github.com/vercel.png"
        title="Assistência Farmacêutica no Município de Balneário Camboriú - II"
        firstDate="26/08/2022"
        lastDate="25/11/2022"
        availability={1}
        finished={false}
      />
      <CourseCard
        image="https://github.com/vercel.png"
        title="Anestesiologia"
        firstDate="29/09/22"
        lastDate="29/09/22"
        availability={0}
        finished
      />
    </div>
  )
}
