import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { NextSeo } from "next-seo";

import { MultiStep } from "@components/index";
import { newCourse } from "@atoms/newCourseAtom";

import { BasicInfoForm, BasicInfoHeader } from "./BasicInfoStep";
import { DataInfoForm, DataInfoHeader } from "./DataInfoStep";
import { MinisterInfoForm, MinisterInfoHeader } from "./MinisterInfoStep";
import { SelectAxesForm, SelectAxesHeader } from "./SelectAxesStep";
import { SetCategoryForm, SetCategoryHeader } from "./SetCategoryStep";

import { Container } from "./styles";

export default function InsertNewCourse() {
  const [currentStep, setCurrentStep] = useState(1);
  const [course] = useAtom(newCourse);

  const handleCreateCourse = useCallback(async () => {
    console.log(course);
  }, [course]);

  useEffect(() => {
    if (course.category) {
      handleCreateCourse();
    }
  }, [course, handleCreateCourse]);

  return (
    <>
      <NextSeo
        title="Inserir curso | PLACUR"
        description="Preencha o formulario para inserir um novo curso."
      />

      <Container>
        {currentStep === 1 && <BasicInfoHeader />}
        {currentStep === 2 && <DataInfoHeader />}
        {currentStep === 3 && <MinisterInfoHeader />}
        {currentStep === 4 && <SelectAxesHeader />}
        {currentStep === 5 && <SetCategoryHeader />}

        <MultiStep size={5} currentStep={currentStep} />

        {currentStep === 1 && <BasicInfoForm onCompleteStep={setCurrentStep} />}
        {currentStep === 2 && <DataInfoForm onCompleteStep={setCurrentStep} />}
        {currentStep === 3 && (
          <MinisterInfoForm onCompleteStep={setCurrentStep} />
        )}
        {currentStep === 4 && (
          <SelectAxesForm onCompleteStep={setCurrentStep} />
        )}
        {currentStep === 5 && <SetCategoryForm />}
      </Container>
    </>
  );
}
