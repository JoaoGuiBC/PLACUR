import { Checkbox } from "../../components/Checkbox";
import { SectionTitle } from "../../components/SectionTitle";

export default function Perfil() {
  return (
    <div>
      <SectionTitle style="secondary">Hello Perfil</SectionTitle>

      <Checkbox title="Você é funcionário público de Balneário Camboriú?" />
    </div>
  )
}