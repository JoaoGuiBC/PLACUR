import { z } from "zod";
import { useAtom } from "jotai";
import { Exam } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { newCourse } from "@atoms/newCourseAtom";
import { Button, Heading, Text, TextInput } from "@components/index";

import { FormContainer, HeaderContainer } from "../styles";

const BasicInfoFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Digite um nome com mais de três caracteres" })
    .transform((value) => value.toLowerCase()),
});

type BasicInfoFormData = z.infer<typeof BasicInfoFormSchema>;

interface BasicInfoStepProps {
  onCompleteStep: (step: number) => void;
}

export function BasicInfoForm({ onCompleteStep }: BasicInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(BasicInfoFormSchema),
  });

  const [newCourseData, setNewCourse] = useAtom(newCourse);

  async function handleSubmitBasicInfo(data: BasicInfoFormData) {
    setNewCourse({ ...newCourseData, title: data.title });

    onCompleteStep(2);
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleSubmitBasicInfo)}>
      <TextInput
        Icon={Exam}
        isErrored={!!errors.title}
        placeholder={
          errors.title
            ? `Nome do curso - ${errors.title.message}`
            : "Nome do curso"
        }
        {...register("title")}
      />

      <Button disabled={isSubmitting}>Próximo passo</Button>
    </FormContainer>
  );
}

export function BasicInfoHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Vamos inserir um novo curso!</Heading>

      <Text size="lg">
        Vamos começar pelo básico, com o nome e a imagem do curso
      </Text>
    </HeaderContainer>
  );
}
