import dayjs from 'dayjs'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useSetAtom } from 'jotai'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import type { GetServerSideProps } from 'next'
import { useQuery } from '@tanstack/react-query'
import { FormEvent, Fragment, useState } from 'react'

import { prisma } from '@lib/prisma'
import { toastState } from '@atoms/toastAtom'
import { authOptions } from '@api/auth/[...nextauth].api'
import { maskDocument, maskPhone } from '@utils/inputMasks'
import { capitalizeSentence } from '@utils/capitalize-sentence'
import { listUsersQuery } from '@utils/queries/list-users-query'

import { Searchbar } from '@components/Searchbar'
import { Pagination } from '@components/Pagination'

import {
  Table,
  TableRow,
  Separator,
  TableBody,
  SearchContainer,
  SeparatorTableRow,
} from './styles'

interface User {
  id: string
  document: string
  name: string
  phone: string
  updated_at: string
  count: {
    enrollments: number
  }
}

interface AppUsersProps {
  users: User[]
  countUsers: number
  usersPerPage: number
}

export default function AppUsers({
  users,
  countUsers,
  usersPerPage,
}: AppUsersProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [nameSearch, setNameSearch] = useState('')
  const [documentSearch, setDocumentSearch] = useState('')

  const setToast = useSetAtom(toastState)

  const { data: usersList, refetch } = useQuery<{
    users: User[]
    countUsers: number
  }>(
    ['userList'],
    async () => {
      try {
        return await listUsersQuery({
          name: nameSearch,
          document: documentSearch,
          take: usersPerPage,
          skip: (currentPage - 1) * usersPerPage,
        })
      } catch (error: any) {
        const { response } = error as AxiosError<{ message: string }>

        setToast({
          title: 'Ops, temos um problema',
          description: response?.data.message ?? 'Erro ao recuperar usuários.',
          type: 'error',
          isOpen: true,
        })

        return { users, countUsers }
      }
    },
    { enabled: false, initialData: { users, countUsers } }
  )

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    refetch()
  }

  return (
    <>
      <NextSeo
        title="Administrar usuários | PLACUR"
        description="Selecione um usuário para visualizar e editar as informações dele."
      />

      <SearchContainer>
        <Searchbar
          placeholder="Pesquisar nome"
          value={nameSearch}
          onChange={({ currentTarget }) => setNameSearch(currentTarget.value)}
          onSearch={handleSearch}
        />
        <Searchbar
          placeholder="Pesquisar CPF"
          value={documentSearch}
          onChange={({ currentTarget }) =>
            setDocumentSearch(currentTarget.value)
          }
          onSearch={handleSearch}
        />
      </SearchContainer>

      <Pagination
        totalCountOfRegisters={countUsers}
        currentPage={currentPage}
        registerPerPage={usersPerPage}
        onPageChange={setCurrentPage}
      />

      <Table>
        <thead>
          <TableRow>
            <th>Nome</th>
            <th>Qtd. de inscrições</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Data de criação</th>
          </TableRow>
        </thead>

        <TableBody>
          {usersList.users.map((user, index) => (
            <Fragment key={user.id}>
              <Link href={`/perfil/${user.id}`}>
                <TableRow>
                  <td>{capitalizeSentence(user.name)}</td>
                  <td>{user.count.enrollments}</td>
                  <td>{maskDocument(user.document)}</td>
                  <td>{maskPhone(user.phone)}</td>
                  <td>{user.updated_at}</td>
                </TableRow>
              </Link>

              {usersList.users.length - 1 !== index && (
                <SeparatorTableRow>
                  <td>
                    <Separator />
                  </td>
                </SeparatorTableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<AppUsersProps> = async ({
  req,
  res,
}) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      notFound: true,
    }
  }

  if (!session.user.is_admin) {
    return {
      notFound: true,
    }
  }

  const usersPerPage = 10

  const countUsers = await prisma.user.count()

  const users = await prisma.user.findMany({
    skip: 0,
    take: usersPerPage,
    orderBy: { name: 'desc' },
    select: {
      id: true,
      name: true,
      document: true,
      phone: true,
      updated_at: true,
      _count: {
        select: {
          CourseEnrollment: true,
        },
      },
    },
  })

  const parsedUsers = users.map((user) => {
    return {
      id: user.id,
      document: String(user.document),
      name: String(user.name),
      phone: String(user.phone),
      updated_at: dayjs(user.updated_at!).format('DD[ de ]MMMM[ de ]YYYY'),
      count: {
        enrollments: user._count.CourseEnrollment,
      },
    }
  })

  return { props: { users: parsedUsers, countUsers, usersPerPage } }
}
