import { z } from "zod";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { newCourse } from "@atoms/newCourseAtom";
import { courseCategories } from "@utils/selectValues";
import { Text, Button, Select, Heading } from "@components/index";
import { convertTimeStringToMinutes } from "@utils/convert-time-string-to-minutes";

import { EncounterForm } from "./EncounterForm";
import { FormContainer, HeaderContainer } from "../styles";
import { ClassForm } from "./ClassForm";

const courseTypes = [
  { value: "ead", text: "EAD" },
  { value: "turma", text: "Turmas" },
  { value: "encontro", text: "Encontros" },
];

const SetCategoryFormSchema = z.object({
  category: z.string().min(1),
  type: z.string().min(1),
  meetings: z
    .array(
      z.object({
        date: z
          .date({ coerce: true })
          .refine((date) => dayjs(date).endOf("day").isAfter(new Date()), {
            message: "A data não pode ser um dia que já passou",
          }),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .transform((meetings) => {
      return meetings.map((meeting) => {
        return {
          date: meeting.date,
          startTimeInMinutes: convertTimeStringToMinutes(meeting.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(meeting.endTime),
        };
      });
    })
    .refine(
      (meetings) => {
        return meetings.every(
          (meeting) =>
            meeting.endTimeInMinutes - 60 >= meeting.startTimeInMinutes
        );
      },
      {
        message: "O término deve ser pelo menos uma hora após o início",
      }
    ),
  classes: z
    .array(
      z.object({
        name: z.string().min(3, { message: "Informe o nome da turma" }),
        date: z
          .date({ coerce: true })
          .refine((date) => dayjs(date).endOf("day").isAfter(new Date()), {
            message: "A data não pode ser um dia que já passou",
          }),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .transform((classes) => {
      return classes.map((item) => {
        return {
          name: item.name,
          date: item.date,
          startTimeInMinutes: convertTimeStringToMinutes(item.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(item.endTime),
        };
      });
    })
    .refine(
      (classes) => {
        return classes.every(
          (item) => item.endTimeInMinutes - 60 >= item.startTimeInMinutes
        );
      },
      {
        message: "O término deve ser pelo menos uma hora após o início",
      }
    ),
});

type SetCategoryFormData = z.infer<typeof SetCategoryFormSchema>;

export function SetCategoryForm() {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetCategoryFormData>({
    resolver: zodResolver(SetCategoryFormSchema),
  });

  const meetingsFields = useFieldArray({
    control,
    name: "meetings",
  });
  const classesFields = useFieldArray({
    control,
    name: "classes",
  });

  const type = watch("type");
  const category = watch("category");

  const [newCourseData, setNewCourse] = useAtom(newCourse);

  async function handleSubmitSetCategory(data: SetCategoryFormData) {
    const meetings = data.meetings.map((meeting) => {
      return {
        date: meeting.date,
        endTime: meeting.endTimeInMinutes,
        startTime: meeting.startTimeInMinutes,
      };
    });
    const classes = data.classes.map((item) => {
      return {
        name: item.name,
        date: item.date,
        endTime: item.endTimeInMinutes,
        startTime: item.startTimeInMinutes,
      };
    });

    setNewCourse({
      ...newCourseData,
      category: data.category,
      meetings: [...meetings],
      classes: [...classes],
    });
  }

  function handleSetCourseType() {
    meetingsFields.remove(meetingsFields.fields.map((_, index) => index));
    classesFields.remove(classesFields.fields.map((_, index) => index));
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleSubmitSetCategory)}>
      <Controller
        name="category"
        control={control}
        render={({ field }) => {
          return (
            <Select
              size="lg"
              emptyValue="Categoria"
              content={courseCategories}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            />
          );
        }}
      />

      {category && (
        <Controller
          name="type"
          control={control}
          render={({ field }) => {
            return (
              <Select
                size="lg"
                emptyValue="Tipo do curso"
                content={courseTypes}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  handleSetCourseType();
                }}
              />
            );
          }}
        />
      )}

      {type === "encontro" && (
        <EncounterForm
          register={register}
          errors={errors}
          meetingsFields={meetingsFields}
        />
      )}

      {type === "turma" && (
        <ClassForm
          register={register}
          errors={errors}
          classesFields={classesFields}
        />
      )}

      {(type === "ead" ||
        meetingsFields.fields.length !== 0 ||
        classesFields.fields.length !== 0) && (
        <Button disabled={isSubmitting}>Finalizar</Button>
      )}
    </FormContainer>
  );
}

export function SetCategoryHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Finalização</Heading>

      <Text size="lg">
        Por último, informe qual a modalidade do curso e preencha os requisitos
        que cada modalidade necessita
      </Text>
    </HeaderContainer>
  );
}
