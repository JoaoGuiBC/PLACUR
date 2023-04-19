import {
  CalendarBlank,
  CalendarPlus,
  Clock,
  ClockAfternoon,
  CalendarX,
} from 'phosphor-react'
import { Fragment } from 'react'
import { UseFieldArrayReturn } from 'react-hook-form'

import { Button, Separator, TextInput } from '@components/index'

import { Container, MeetingInfoSection, InputsContainer } from './styles'

interface EncounterFormProps {
  register: any
  errors: any
  meetingsFields: UseFieldArrayReturn<
    {
      category: string
      type: string
      meetings: {
        date: Date
        startTimeInMinutes: number
        endTimeInMinutes: number
      }[]
      classes: any
    },
    'meetings',
    'id'
  >
}

export function EncounterForm({
  register,
  errors,
  meetingsFields,
}: EncounterFormProps) {
  const { fields, append, remove } = meetingsFields

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Fragment key={field.id}>
            <Separator css={{ $$baseColor: '$colors$gray100' }} />

            <MeetingInfoSection>
              <InputsContainer>
                <TextInput
                  Icon={CalendarBlank}
                  type="date"
                  isErrored={!!errors?.meetings?.[index]?.date}
                  placeholder={
                    errors?.meetings?.[index]?.date
                      ? `Data - ${errors?.meetings?.[index]?.date?.message}`
                      : 'Data'
                  }
                  {...register(`meetings.${index}.date`)}
                />

                <Container>
                  <TextInput
                    Icon={Clock}
                    type="time"
                    isErrored={!!errors?.meetings?.[index]?.startTimeInMinutes}
                    placeholder={
                      errors?.meetings?.[index]?.startTimeInMinutes
                        ? `Horário do início - ${errors?.meetings?.[index]?.startTimeInMinutes.message}`
                        : 'Horário do início'
                    }
                    {...register(`meetings.${index}.startTime`)}
                  />

                  <TextInput
                    Icon={ClockAfternoon}
                    type="time"
                    isErrored={!!errors?.meetings?.[index]?.endTimeInMinutes}
                    placeholder={
                      errors?.meetings?.[index]?.endTimeInMinutes
                        ? `Horário do fim - ${errors?.meetings?.[index]?.endTimeInMinutes.message}`
                        : 'Horário do fim'
                    }
                    {...register(`meetings.${index}.endTime`)}
                  />
                </Container>
              </InputsContainer>

              <Button
                variant="withIcon"
                size="min"
                css={{ $$baseColor: '$colors$red500' }}
                type="button"
                onClick={() => remove(0)}
              >
                <CalendarX size={32} />
              </Button>
            </MeetingInfoSection>
          </Fragment>
        )
      })}

      {errors?.meetings?.message && <span>{errors?.meetings?.message}</span>}

      <Button
        variant="withIcon"
        size="min"
        css={{ $$baseColor: '$colors$green500' }}
        type="button"
        onClick={() =>
          append({
            date: new Date(),
            endTimeInMinutes: 0,
            startTimeInMinutes: 0,
          })
        }
      >
        <CalendarPlus size={32} />
      </Button>
    </>
  )
}
