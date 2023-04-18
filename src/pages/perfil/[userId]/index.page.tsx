import {
  EnvelopeSimple,
  GlobeHemisphereWest,
  IdentificationBadge,
  IdentificationCard,
  Phone,
} from 'phosphor-react'
import { z } from 'zod'
import dayjs from 'dayjs'
import { NextSeo } from 'next-seo'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useState } from 'react'

import { api } from '@lib/axios'
import { prisma } from '@lib/prisma'
import { maskDocument, maskPhone } from '@utils/inputMasks'
import { capitalizeSentence } from '@utils/capitalize-sentence'
import { authOptions } from '@pages/api/auth/[...nextauth].api'

import {
  Container,
  PageHeader,
  Label,
  Content,
  UserInfoContainer,
  UserInfoSection,
} from './styles'
import {
  Text,
  Avatar,
  Button,
  Heading,
  Checkbox,
  TextInput,
} from '@components/index'
import { theme } from 'stitches.config'
import { AxiosError } from 'axios'
import { toastState } from '@atoms/toastAtom'
import { useSetAtom } from 'jotai'

const userFormSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  name: z
    .string()
    .min(4, { message: 'Informe o seu nome completo.' })
    .transform((value) => value.toLowerCase()),
  document: z
    .string()
    .min(14, { message: 'Informe um CPF válido' })
    .transform((value) => value.replace(/\D/g, '')),
  phone: z
    .string()
    .min(14, { message: 'Informe um telefone válido' })
    .transform((value) => value.replace(/\D/g, '')),
  address: z
    .string()
    .min(4, { message: 'Informe o seu endereço.' })
    .transform((value) => value.toLowerCase()),
  neighborhood: z
    .string()
    .min(4, { message: 'Informe o seu bairro.' })
    .transform((value) => value.toLowerCase()),
  city: z
    .string()
    .min(4, { message: 'Informe a sua cidade.' })
    .transform((value) => value.toLowerCase()),
  isAdmin: z.boolean(),
})

type UserFormData = z.infer<typeof userFormSchema>

interface User {
  id: string
  name: string
  city: string
  email: string
  phone: string
  address: string
  document: string
  is_admin: boolean
  created_at: number
  neighborhood: string
  image: string | null
}

interface PerfilProps {
  user: User
  isAdminSession: boolean
}

export default function Perfil({ user, isAdminSession }: PerfilProps) {
  const [userName, setUserName] = useState(user.name)
  const [userImage, setUserImage] = useState(user.image)

  const {
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: maskPhone(user.phone),
      document: maskDocument(user.document),
      city: user.city,
      address: user.address,
      neighborhood: user.neighborhood,
      isAdmin: user.is_admin,
    },
  })

  const phone = watch('phone')
  const document = watch('document')

  const setToast = useSetAtom(toastState)

  async function handleUpdateUserImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = async () => {
        const { data } = await api.put('/users/update-profile/image', {
          image: reader.result,
          userId: user.id,
        })

        setUserImage(data.userImage)
      }
    }
  }

  async function handleUpdateUserInfo(data: UserFormData) {
    try {
      await api.put('/users/update-profile', { id: user.id, ...data })
      setUserName(data.name)
    } catch (error: any) {
      const { response } = error as AxiosError<{ message: string }>

      setToast({
        title: 'Ops, temos um problema',
        description: response?.data.message ?? '',
        type: 'error',
        isOpen: true,
      })
    }
  }

  async function handleDeleteUser() {
    try {
      await api.delete('/users/delete', { params: { id: user.id } })
    } catch (error: any) {
      const { response } = error as AxiosError<{ message: string }>

      setToast({
        title: 'Ops, temos um problema',
        description: response?.data.message ?? '',
        type: 'error',
        isOpen: true,
      })
    }
  }

  useEffect(() => {
    if (document) {
      const maskedDocument = maskDocument(document)
      setValue('document', maskedDocument)
    }
    if (phone) {
      const maskedPhone = maskPhone(phone)
      setValue('phone', maskedPhone)
    }
  }, [document, phone, setValue])

  return (
    <>
      <NextSeo
        title={`${capitalizeSentence(user.name)} | PLACUR`}
        description="Todas as informações pertinentes a sua conta."
      />

      <Container>
        <PageHeader>
          <input
            type="file"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            id="userImage"
            onChange={handleUpdateUserImage}
          />
          <Label htmlFor="userImage">
            <Avatar src={userImage || undefined} />
            <Text size="sm">Trocar imagem</Text>
          </Label>
          <Heading style="secondary">{capitalizeSentence(userName)}</Heading>
        </PageHeader>

        <Content onSubmit={handleSubmit(handleUpdateUserInfo)}>
          <UserInfoContainer>
            <UserInfoSection>
              <Text as="h2" size="lg">
                Dados de login
              </Text>

              <TextInput
                Icon={EnvelopeSimple}
                isErrored={!!errors.email}
                placeholder={
                  errors.email ? `E-Mail - ${errors.email.message}` : 'E-Mail'
                }
                {...register('email')}
              />
            </UserInfoSection>

            <UserInfoSection>
              <Text as="h2" size="lg">
                Dados pessoais
              </Text>

              <TextInput
                Icon={IdentificationBadge}
                isErrored={!!errors.name}
                placeholder={
                  errors.name
                    ? `Nome completo - ${errors.name.message}`
                    : 'Nome completo'
                }
                {...register('name')}
              />
              <TextInput
                Icon={IdentificationCard}
                isErrored={!!errors.document}
                placeholder={
                  errors.document ? `CPF - ${errors.document.message}` : 'CPF'
                }
                {...register('document')}
              />
              <TextInput
                Icon={Phone}
                isErrored={!!errors.phone}
                placeholder={
                  errors.phone
                    ? `Telefone - ${errors.phone.message}`
                    : 'Telefone'
                }
                {...register('phone')}
              />
            </UserInfoSection>

            {isAdminSession && (
              <Controller
                name={'isAdmin'}
                control={control}
                render={({ field }) => {
                  return (
                    <Checkbox
                      title="Essa pessoa é administradora da plataforma?"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked === true)
                      }}
                    />
                  )
                }}
              />
            )}
          </UserInfoContainer>

          <UserInfoContainer>
            <UserInfoSection>
              <Text as="h2" size="lg">
                Endereço
              </Text>

              <TextInput
                Icon={GlobeHemisphereWest}
                isErrored={!!errors.address}
                placeholder={
                  errors.address
                    ? `Endereço - ${errors.address.message}`
                    : 'Endereço'
                }
                {...register('address')}
              />
              <TextInput
                Icon={GlobeHemisphereWest}
                isErrored={!!errors.neighborhood}
                placeholder={
                  errors.neighborhood
                    ? `Bairro - ${errors.neighborhood.message}`
                    : 'Bairro'
                }
                {...register('neighborhood')}
              />
              <TextInput
                Icon={GlobeHemisphereWest}
                isErrored={!!errors.city}
                placeholder={
                  errors.city ? `Cidade - ${errors.city.message}` : 'Cidade'
                }
                {...register('city')}
              />
            </UserInfoSection>

            <UserInfoSection>
              <Text as="h2" size="lg">
                Zona de risco
              </Text>

              <Button
                variant="secondary"
                size="min"
                onClick={handleDeleteUser}
                css={{ $$baseColor: theme.colors.red500.value }}
              >
                Deletar conta
              </Button>
            </UserInfoSection>

            <Text>
              {`Conta criada dia ${dayjs(user.created_at).format(
                'DD[ de ]MMMM[ de ]YYYY'
              )}`}
            </Text>
          </UserInfoContainer>
        </Content>

        <Button
          size="min"
          disabled={isSubmitting}
          onClick={handleSubmit(handleUpdateUserInfo)}
        >
          Salvar alterações
        </Button>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      notFound: true,
    }
  }

  const userId = String(params.userId)

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      city: true,
      image: true,
      email: true,
      phone: true,
      address: true,
      document: true,
      is_admin: true,
      created_at: true,
      neighborhood: true,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  if (!session.user.is_admin && userId !== session.user.id) {
    return {
      notFound: true,
    }
  }

  const parsedUser = {
    id: user.id,
    name: user.name!,
    city: user.city!,
    image: user.image,
    email: user.email!,
    phone: user.phone!,
    address: user.address!,
    document: user.document!,
    is_admin: user.is_admin,
    neighborhood: user.neighborhood!,
    created_at: user.created_at.getTime(),
  }

  return {
    props: {
      user: parsedUser,
      isAdminSession: session.user.is_admin,
    },
  }
}
