import { z } from 'zod'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { IdentificationCard, Trash, UserPlus } from 'phosphor-react'

import {
  Button,
  Heading,
  Separator,
  Text,
  TextArea,
  TextInput,
} from '@components/index'
import { newCourse } from '@atoms/newCourseAtom'

import { FormContainer, HeaderContainer } from '../styles'
import { MinisterInfoSection, InputsContainer } from './styles'

const MinisterInfoFormSchema = z.object({
  ministers: z.array(
    z.object({
      name: z.string().min(5, { message: 'Informe o nome completo' }),
      qualification: z
        .string()
        .min(5, { message: 'Informe a formação completa' }),
    })
  ),
})

type MinisterInfoFormData = z.infer<typeof MinisterInfoFormSchema>

interface MinisterInfoStepProps {
  onCompleteStep: (step: number) => void
}

export function MinisterInfoForm({ onCompleteStep }: MinisterInfoStepProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MinisterInfoFormData>({
    resolver: zodResolver(MinisterInfoFormSchema),
    defaultValues: {
      ministers: [
        {
          name: '',
          qualification: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ministers',
  })

  const [newCourseData, setNewCourse] = useAtom(newCourse)

  async function MinisterInfo(data: MinisterInfoFormData) {
    setNewCourse({ ...newCourseData, ministers: [...data.ministers] })

    onCompleteStep(4)
  }

  return (
    <FormContainer onSubmit={handleSubmit(MinisterInfo)}>
      {fields.map((field, index) => {
        return index === 0 ? (
          <Fragment key={field.id}>
            <TextInput
              key={field.id}
              Icon={IdentificationCard}
              isErrored={!!errors?.ministers?.[index]?.name}
              placeholder={
                errors?.ministers?.[index]?.name
                  ? `Ministrante - ${errors?.ministers?.[index]?.name?.message}`
                  : 'Ministrante'
              }
              {...register(`ministers.${index}.name`)}
            />

            <TextArea
              isErrored={!!errors?.ministers?.[index]?.qualification}
              placeholder={
                errors?.ministers?.[index]?.qualification
                  ? `Resumo - ${errors?.ministers?.[index]?.qualification?.message}`
                  : 'Resumo'
              }
              {...register(`ministers.${index}.qualification`)}
            />
          </Fragment>
        ) : (
          <Fragment key={field.id}>
            <Separator css={{ $$baseColor: '$colors$gray100' }} />

            <MinisterInfoSection>
              <InputsContainer>
                <TextInput
                  Icon={IdentificationCard}
                  isErrored={!!errors?.ministers?.[index]?.name}
                  placeholder={
                    errors?.ministers?.[index]?.name
                      ? `Ministrante - ${errors?.ministers?.[index]?.name?.message}`
                      : 'Ministrante'
                  }
                  {...register(`ministers.${index}.name`)}
                />

                <TextArea
                  isErrored={!!errors?.ministers?.[index]?.qualification}
                  placeholder={
                    errors?.ministers?.[index]?.qualification
                      ? `Resumo - ${errors?.ministers?.[index]?.qualification?.message}`
                      : 'Resumo'
                  }
                  {...register(`ministers.${index}.qualification`)}
                />
              </InputsContainer>

              <Button
                variant="withIcon"
                size="min"
                css={{ $$baseColor: '$colors$red500' }}
                type="button"
                onClick={() => remove(index)}
              >
                <Trash size={32} />
              </Button>
            </MinisterInfoSection>
          </Fragment>
        )
      })}

      <Button
        variant="withIcon"
        size="min"
        css={{ $$baseColor: '$colors$green500' }}
        type="button"
        onClick={() => append({ name: '', qualification: '' })}
      >
        <UserPlus size={32} />
      </Button>

      <Button disabled={isSubmitting}>Próximo passo</Button>
    </FormContainer>
  )
}

export function MinisterInfoHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Quem é responsável pelo curso?</Heading>

      <Text size="lg">
        Você precisa inserir o nome de cada ministrante junto com um resumo
        sobre ele (formação, trabalhos relevantes, etc...)
      </Text>
    </HeaderContainer>
  )
}
