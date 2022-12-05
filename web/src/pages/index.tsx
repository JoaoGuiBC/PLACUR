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
        category="Workshop"
      />
      <CourseCard
        image="https://github.com/vercel.png"
        title="Primeiras intervenções nas urgências e emergências no ambiente escolar - SEDUC"
        firstDate="26/08/2022"
        lastDate="23/11/2022"
        availability={91}
        finished={false}
        category="Capacitação"
      />
      <CourseCard
        image="https://github.com/vercel.png"
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
