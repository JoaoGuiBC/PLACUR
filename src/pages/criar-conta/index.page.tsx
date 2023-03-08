import { useState } from "react";
import { NextSeo } from "next-seo";
import { getServerSession } from "next-auth";
import type { GetServerSideProps } from "next";

import { MultiStep } from "@components/index";
import { authOptions } from "@api/auth/[...nextauth].api";

import {
  HaveDisabilityStepForm,
  HaveDisabilityStepHeader,
  DisabilityFormData,
} from "./HaveDisabilityStep";
import { AddressStepForm, AddressStepHeader } from "./AddressStep";
import { PersonalInfoForm, PersonalInfoHeader } from "./PersonalInfoStep";

import { Container } from "./styles";
import { prisma } from "@lib/prisma";

interface CreateAccountProps {
  initialStep: number;
}

export default function CreateAccount({ initialStep }: CreateAccountProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  return (
    <>
      <NextSeo
        title="Criar conta | PLACUR"
        description="Complete o formulario para finalizar a sua conta."
      />

      <Container>
        {currentStep === 1 && <PersonalInfoHeader />}
        {currentStep === 2 && <AddressStepHeader />}
        {currentStep === 3 && <HaveDisabilityStepHeader />}

        <MultiStep size={3} currentStep={currentStep} />

        {currentStep === 1 && (
          <PersonalInfoForm onCompleteStep={setCurrentStep} />
        )}
        {currentStep === 2 && (
          <AddressStepForm onCompleteStep={setCurrentStep} />
        )}
        {currentStep === 3 && <HaveDisabilityStepForm />}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  if (session.user.updated_at) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  if (session.user.address) {
    return { props: { initialStep: 3 } };
  }

  if (session.user.document) {
    return { props: { initialStep: 2 } };
  }

  return { props: { initialStep: 1 } };
};
