import { z } from 'zod'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { newCourse } from '@atoms/newCourseAtom'
import { Button, Heading, Text, TextArea } from '@components/index'

import { FormContainer, HeaderContainer } from '../styles'

const DataInfoFormSchema = z.object({
  targetAudience: z
    .string()
    .min(5, { message: 'Por favor, informe o público alvo' }),
  objective: z.string().min(5, { message: 'Por favor, informe o objetivo' }),
  observations: z
    .string()
    .min(5, { message: 'Por favor, informe as observações' }),
  content: z
    .string()
    .min(5, { message: 'Por favor, informe o conteúdo programático' }),
})

type DataInfoFormData = z.infer<typeof DataInfoFormSchema>

interface DataInfoStepProps {
  onCompleteStep: (step: number) => void
}

export function DataInfoForm({ onCompleteStep }: DataInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DataInfoFormData>({
    resolver: zodResolver(DataInfoFormSchema),
  })

  const [newCourseData, setNewCourse] = useAtom(newCourse)

  async function DataInfo(data: DataInfoFormData) {
    setNewCourse({ ...newCourseData, ...data })

    onCompleteStep(3)
  }

  return (
    <FormContainer onSubmit={handleSubmit(DataInfo)}>
      <TextArea
        isErrored={!!errors.targetAudience}
        placeholder={
          errors.targetAudience
            ? `Público Alvo - ${errors.targetAudience.message}`
            : 'Público Alvo'
        }
        {...register('targetAudience')}
      />

      <TextArea
        isErrored={!!errors.objective}
        placeholder={
          errors.objective
            ? `Objetivo - ${errors.objective.message}`
            : 'Objetivo'
        }
        {...register('objective')}
      />

      <TextArea
        isErrored={!!errors.observations}
        placeholder={
          errors.observations
            ? `Observação - ${errors.observations.message}`
            : 'Observação'
        }
        {...register('observations')}
      />

      <TextArea
        isErrored={!!errors.content}
        placeholder={
          errors.content
            ? `Conteúdo programático - ${errors.content.message}`
            : 'Conteúdo programático'
        }
        {...register('content')}
      />

      <Button disabled={isSubmitting}>Próximo passo</Button>
    </FormContainer>
  )
}

export function DataInfoHeader() {
  return (
    <HeaderContainer>
      <Heading style="secondary">Quais as informações do curso?</Heading>

      <Text size="lg">
        Aqui você precisa colocar as informações básicas do curso, elas serão
        mostradas para os alunos na página dedicada do curso
      </Text>
    </HeaderContainer>
  )
}
