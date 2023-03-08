import { z } from "zod";
import { useForm } from "react-hook-form";
import { GlobeHemisphereWest } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@lib/axios";
import { Button, Heading, Text, TextInput } from "@components/index";

import { FormContainer, HeaderContainer } from "../styles";

const addressFormSchema = z.object({
  address: z
    .string()
    .min(4, { message: "Informe o seu endereço." })
    .transform((value) => value.toLowerCase()),
  neighborhood: z
    .string()
    .min(4, { message: "Informe o seu bairro." })
    .transform((value) => value.toLowerCase()),
  city: z
    .string()
    .min(4, { message: "Informe a sua cidade." })
    .transform((value) => value.toLowerCase()),
});

type AddressFormData = z.infer<typeof addressFormSchema>;

interface AddressStepProps {
  onCompleteStep: (step: number) => void;
}

export function AddressStepForm({ onCompleteStep }: AddressStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
  });

  async function handleSubmitAddress(data: AddressFormData) {
    await api.put("/users/update-profile/address", { ...data });

    onCompleteStep(3);
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleSubmitAddress)}>
      <TextInput
        Icon={GlobeHemisphereWest}
        isErrored={!!errors.address}
        placeholder={
          errors.address ? `Endereço - ${errors.address.message}` : "Endereço"
        }
        {...register("address")}
      />
      <TextInput
        Icon={GlobeHemisphereWest}
        isErrored={!!errors.neighborhood}
        placeholder={
          errors.neighborhood
            ? `Bairro - ${errors.neighborhood.message}`
            : "Bairro"
        }
        {...register("neighborhood")}
      />
      <TextInput
        Icon={GlobeHemisphereWest}
        isErrored={!!errors.city}
        placeholder={errors.city ? `Cidade - ${errors.city.message}` : "Cidade"}
        {...register("city")}
      />

      <Button disabled={isSubmitting}>Próximo passo</Button>
    </FormContainer>
  );
}

export function AddressStepHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Onde você mora?</Heading>

      <Text size="lg">
        Precisamos de algumas informações para criar seu perfil. Você pode
        editar essas informações depois.
      </Text>
    </HeaderContainer>
  );
}
