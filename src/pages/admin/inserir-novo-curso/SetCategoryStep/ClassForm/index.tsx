import {
  CalendarBlank,
  Clock,
  ClockAfternoon,
  UserPlus,
  UsersFour,
  UserMinus,
} from "phosphor-react";
import { Fragment } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

import { Button, Separator, TextInput } from "@components/index";

import { Container, ClassInfoSection, InputsContainer } from "./styles";

interface ClassFormProps {
  register: any;
  errors: any;
  classesFields: UseFieldArrayReturn<
    {
      category: string;
      type: string;
      meetings: any;
      classes: {
        name: string;
        date: Date;
        startTimeInMinutes: number;
        endTimeInMinutes: number;
      }[];
    },
    "classes",
    "id"
  >;
}

export function ClassForm({ register, errors, classesFields }: ClassFormProps) {
  const { fields, append, remove } = classesFields;

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Fragment key={field.id}>
            <Separator css={{ $$baseColor: "$colors$gray100" }} />

            <ClassInfoSection>
              <InputsContainer>
                <TextInput
                  Icon={UsersFour}
                  isErrored={!!errors?.classes?.[index]?.name}
                  placeholder={
                    errors?.classes?.[index]?.name
                      ? `Nome da turma - ${errors?.classes?.[index]?.name?.message}`
                      : "Nome da turma"
                  }
                  {...register(`classes.${index}.name`)}
                />

                <TextInput
                  Icon={CalendarBlank}
                  type="date"
                  isErrored={!!errors?.classes?.[index]?.date}
                  placeholder={
                    errors?.classes?.[index]?.date
                      ? `Data - ${errors?.classes?.[index]?.date?.message}`
                      : "Data"
                  }
                  {...register(`classes.${index}.date`)}
                />

                <Container>
                  <TextInput
                    Icon={Clock}
                    type="time"
                    isErrored={!!errors?.classes?.[index]?.startTimeInMinutes}
                    placeholder={
                      errors?.classes?.[index]?.startTimeInMinutes
                        ? `Horário do início - ${errors?.classes?.[index]?.startTimeInMinutes.message}`
                        : "Horário do início"
                    }
                    {...register(`classes.${index}.startTime`)}
                  />

                  <TextInput
                    Icon={ClockAfternoon}
                    type="time"
                    isErrored={!!errors?.classes?.[index]?.endTimeInMinutes}
                    placeholder={
                      errors?.classes?.[index]?.endTimeInMinutes
                        ? `Horário do fim - ${errors?.classes?.[index]?.endTimeInMinutes.message}`
                        : "Horário do fim"
                    }
                    {...register(`classes.${index}.endTime`)}
                  />
                </Container>
              </InputsContainer>

              <Button
                variant="withIcon"
                size="min"
                css={{ $$baseColor: "$colors$red500" }}
                type="button"
                onClick={() => remove(0)}
              >
                <UserMinus size={32} />
              </Button>
            </ClassInfoSection>
          </Fragment>
        );
      })}

      {errors?.classes?.message && <span>{errors?.classes?.message}</span>}

      <Button
        variant="withIcon"
        size="min"
        css={{ $$baseColor: "$colors$green500" }}
        type="button"
        onClick={() =>
          append({
            name: "",
            date: new Date(),
            endTimeInMinutes: 0,
            startTimeInMinutes: 0,
          })
        }
      >
        <UserPlus size={32} />
      </Button>
    </>
  );
}
