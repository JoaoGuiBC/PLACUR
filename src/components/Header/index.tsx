import Link from 'next/link'
import Image from 'next/image'
import { ComponentProps } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  BookBookmark,
  CaretRight,
  Gear,
  IdentificationBadge,
  SignOut,
  UsersFour,
} from 'phosphor-react'

import { Avatar } from '../Avatar'
import { Separator } from '../Separator'

import { theme } from 'stitches.config'
import {
  Container,
  DropdownMenuContent,
  DropdownMenuSubContent,
  UserInfoContainer,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
} from './styles'
import { Text } from '@components/Text'

interface HeaderProps extends ComponentProps<typeof Container> {}

function Header(props: HeaderProps) {
  return (
    <Container {...props}>
      <Link href="/">
        <Image
          src="/logo_egepe.png"
          alt="Logo EGEPE"
          quality={100}
          width={156}
          height={88}
          priority
        />
      </Link>

      {/* <Link href="/login">
        <UserInfoContainer>
          <span>Olá, <br /> Faça login</span>

          <Avatar />
        </UserInfoContainer>
        </Link> */}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <UserInfoContainer>
            <span>
              Olá, <br /> João Guilherme Da Rocha
            </span>

            <Avatar src="https://github.com/JoaoGuiBC.png" />
          </UserInfoContainer>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuArrow />

            <DropdownMenuItem>
              <Link href="/perfil/123">
                <IdentificationBadge
                  size={24}
                  color={theme.colors.gray900.value}
                  weight="light"
                />
                <Text size="lg">Perfil</Text>
              </Link>
            </DropdownMenuItem>

            <Separator />
            <DropdownMenuItem>
              <Link href="/perfil/meus-cursos">
                <BookBookmark
                  size={24}
                  color={theme.colors.gray900.value}
                  weight="light"
                />
                <Text size="lg">Meus cursos</Text>
              </Link>
            </DropdownMenuItem>

            <Separator />
            <DropdownMenu.Sub>
              <DropdownMenuSubTrigger>
                <Gear
                  size={24}
                  color={theme.colors.gray900.value}
                  weight="light"
                />
                <Text size="lg">Administrar plataforma</Text>
                <CaretRight
                  size={16}
                  color={theme.colors.gray900.value}
                  weight="light"
                />
              </DropdownMenuSubTrigger>

              <DropdownMenu.Portal>
                <DropdownMenuSubContent sideOffset={16}>
                  <DropdownMenuItem>
                    <Link href="/admin/usuarios-da-plataforma">
                      <UsersFour
                        size={24}
                        color={theme.colors.gray900.value}
                        weight="light"
                      />
                      <Text size="lg">Usuários</Text>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/admin/cursos-da-plataforma">
                      <BookBookmark
                        size={24}
                        color={theme.colors.gray900.value}
                        weight="light"
                      />
                      <Text size="lg">Cursos</Text>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <Separator />
            <DropdownMenuItem>
              <Link href="/">
                <SignOut
                  size={24}
                  color={theme.colors.gray900.value}
                  weight="light"
                />
                <Text size="lg">Sair</Text>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Container>
  )
}

Header.displayName = 'Header'

export { Header }