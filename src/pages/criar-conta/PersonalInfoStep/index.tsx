import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdentificationBadge, IdentificationCard, Phone } from "phosphor-react";

import { api } from "@lib/axios";
import { maskPhone, maskDocument } from "@utils/inputMasks/index";
import { Button, Heading, Text, TextInput } from "@components/index";

import { FormContainer, HeaderContainer } from "../styles";

const personalInfoFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Informe o seu nome completo." })
    .transform((value) => value.toLowerCase()),
  document: z
    .string()
    .min(14, { message: "Informe um CPF válido" })
    .transform((value) => value.replace(/\D/g, "")),
  phone: z
    .string()
    .min(14, { message: "Informe um telefone válido" })
    .transform((value) => value.replace(/\D/g, "")),
});

type PersonalInfoFormData = z.infer<typeof personalInfoFormSchema>;

interface PersonalInfoStepProps {
  onCompleteStep: (step: number) => void;
}

export function PersonalInfoForm({ onCompleteStep }: PersonalInfoStepProps) {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoFormSchema),
  });

  const phone = watch("phone");
  const document = watch("document");

  async function handleSubmitPersonalInfo(data: PersonalInfoFormData) {
    await api.put("/users/update-profile/profile", { ...data });

    onCompleteStep(2);
  }

  useEffect(() => {
    if (document) {
      const maskedDocument = maskDocument(document);
      setValue("document", maskedDocument);
    }
    if (phone) {
      const maskedPhone = maskPhone(phone);
      setValue("phone", maskedPhone);
    }
  }, [document, phone, setValue]);

  return (
    <FormContainer onSubmit={handleSubmit(handleSubmitPersonalInfo)}>
      <TextInput
        Icon={IdentificationBadge}
        isErrored={!!errors.name}
        placeholder={
          errors.name
            ? `Nome completo - ${errors.name.message}`
            : "Nome completo"
        }
        {...register("name")}
      />
      <TextInput
        Icon={IdentificationCard}
        isErrored={!!errors.document}
        placeholder={
          errors.document ? `CPF - ${errors.document.message}` : "CPF"
        }
        {...register("document")}
      />
      <TextInput
        Icon={Phone}
        isErrored={!!errors.phone}
        placeholder={
          errors.phone ? `Telefone - ${errors.phone.message}` : "Telefone"
        }
        {...register("phone")}
      />

      <Button disabled={isSubmitting}>Próximo passo</Button>
    </FormContainer>
  );
}

export function PersonalInfoHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Nos conte quem você é!</Heading>

      <Text size="lg">
        Precisamos de algumas informações para criar seu perfil! Você pode
        editar essas informações depois.
      </Text>
    </HeaderContainer>
  );
}
