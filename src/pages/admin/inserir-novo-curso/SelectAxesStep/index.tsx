import { z } from 'zod'
import { useAtom } from 'jotai'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { newCourse } from '@atoms/newCourseAtom'
import { Button, Heading, Text, Checkbox } from '@components/index'
import { axesOfKnowledge } from '@utils/selectValues/axesOfKnowledge'

import { FormContainer, HeaderContainer } from '../styles'

const SelectAxesFormSchema = z.object({
  'aposentadoria-e-previdencia': z.boolean(),
  'compras-publicas': z.boolean(),
  comunicacao: z.boolean(),
  'desenvolvimento-pessoal': z.boolean(),
  'direito-e-legislacao': z.boolean(),
  'educacao-e-docencia': z.boolean(),
  'etica-e-cidadania': z.boolean(),
  'gestao-da-informacao-e-do-conhecimento': z.boolean(),
  'gestao-de-pessoas': z.boolean(),
  'gestao-publica-e-de-politicas-publicas': z.boolean(),
  'tecnologia-da-informacao-e-inovacao': z.boolean(),
  'infraestrutura-e-logistica': z.boolean(),
  'meio-ambiente': z.boolean(),
  'politicas-sociais': z.boolean(),
  'politicas-de-saude-e-esporte': z.boolean(),
  'seguranca-publica-e-transito': z.boolean(),
  'transparencia-controle-e-participacao': z.boolean(),
  'turismo-e-cultura': z.boolean(),
})

type SelectAxesFormData = z.infer<typeof SelectAxesFormSchema>

interface SelectAxesStepProps {
  onCompleteStep: (step: number) => void
}

export function SelectAxesForm({ onCompleteStep }: SelectAxesStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SelectAxesFormData>({
    resolver: zodResolver(SelectAxesFormSchema),
  })

  const [newCourseData, setNewCourse] = useAtom(newCourse)

  async function handleSubmitSelectAxes(data: SelectAxesFormData) {
    const selectedAxes = Object.entries(data)
      .filter((axis) => {
        return axis[1]
      })
      .map((axis) => axis[0])

    setNewCourse({ ...newCourseData, axesOfKnowledge: [...selectedAxes] })

    onCompleteStep(5)
  }

  return (
    <FormContainer
      onSubmit={handleSubmit(handleSubmitSelectAxes)}
      css={{ alignItems: 'start' }}
    >
      {axesOfKnowledge.map((axis) => {
        return (
          <Controller
            key={axis.value}
            name={axis.value}
            defaultValue={false}
            control={control}
            render={({ field }) => {
              return (
                <Checkbox
                  title={axis.text}
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked === true)
                  }}
                />
              )
            }}
          />
        )
      })}

      <Button disabled={isSubmitting}>Próximo passo</Button>
    </FormContainer>
  )
}

export function SelectAxesHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Quais os eixos?</Heading>

      <Text size="lg">
        Aqui você vai selecionar quais os eixos de conhecimento relacionados a
        esse curso
      </Text>
    </HeaderContainer>
  )
}
