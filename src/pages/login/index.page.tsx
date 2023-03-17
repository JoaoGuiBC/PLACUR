import { z } from "zod";
import { useSetAtom } from "jotai";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getServerSession } from "next-auth";
import { toastState } from "@atoms/toastAtom";
import type { GetServerSideProps } from "next";
import { EnvelopeSimple } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { authOptions } from "@api/auth/[...nextauth].api";
import { Text, Button, Heading, TextInput } from "@components/index";

import { ButtonContainer, Container, Form, InputContainer } from "./styles";

const informEmailFormSchema = z.object({
  email: z.string().email({ message: "Por favor, informe um e-mail válido." }),
});

type InformEmailFormData = z.infer<typeof informEmailFormSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InformEmailFormData>({
    resolver: zodResolver(informEmailFormSchema),
  });

  const setToast = useSetAtom(toastState);

  const router = useRouter();
  const { message } = router.query;

  async function handleLogin({ email }: InformEmailFormData) {
    try {
      await signIn("email", { email });
    } catch (error: any) {
      setToast({
        title: "Ops, temos um problema",
        description: error.message ?? "",
        type: "error",
        isOpen: true,
      });
    }
  }

  return (
    <>
      <NextSeo
        title="Login | PLACUR"
        description="Informe seue e-mail para entrar na plataforma."
      />

      <Container>
        <Heading style="secondary">Estamos quase lá.</Heading>

        {message === "verifyEmail" ? (
          <Text size="lg">
            Por favor, confira o seu e-mail, enviamos a sua confirmação de login
            por lá.
          </Text>
        ) : (
          <>
            <Text>
              Informe o seu e-mail, caso não tenha uma conta ela será criada
              automaticamente.
            </Text>

            <Form onSubmit={handleSubmit(handleLogin)}>
              <InputContainer>
                <TextInput
                  Icon={EnvelopeSimple}
                  type="email"
                  placeholder={
                    errors.email ? `E-mail - ${errors.email.message}` : "E-mail"
                  }
                  {...register("email")}
                />
              </InputContainer>

              <ButtonContainer>
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </ButtonContainer>
            </Form>
          </>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user?.name) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: "/criar-conta",
      },
      props: {},
    };
  }

  return { props: {} };
};
