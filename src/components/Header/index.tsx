import {
  BookBookmark,
  CaretRight,
  Gear,
  IdentificationBadge,
  SignOut,
  UsersFour,
} from 'phosphor-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentProps } from 'react'
import { useSession, signOut } from 'next-auth/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Text } from '../Text'
import { Avatar } from '../Avatar'
import { Separator } from '../Separator'

import {
  Container,
  DropdownMenuContent,
  DropdownMenuSubContent,
  UserInfoContainer,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  SignOutButton,
} from './styles'
import { theme } from 'stitches.config'

interface HeaderProps extends ComponentProps<typeof Container> {}

function Header(props: HeaderProps) {
  const { data: session } = useSession()

  return (
    <Container {...props}>
      <Link href="/">
        <Image
          src="/logo_placur.png"
          alt="Logo PLACUR"
          quality={100}
          width={294}
          height={90}
          priority
        />
      </Link>

      {session?.user?.name ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <UserInfoContainer>
              <span>
                Olá, <br /> {session.user.name}
              </span>

              <Avatar src={session.user.image ?? undefined} />
            </UserInfoContainer>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuArrow />

              <DropdownMenuItem>
                <Link href={`/perfil/${session.user.id}`}>
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
                <Link href={`/perfil/${session.user.id}/meus-cursos`}>
                  <BookBookmark
                    size={24}
                    color={theme.colors.gray900.value}
                    weight="light"
                  />
                  <Text size="lg">Meus cursos</Text>
                </Link>
              </DropdownMenuItem>

              {session.user.is_admin && (
                <>
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
                </>
              )}

              <Separator />
              <DropdownMenuItem>
                <SignOutButton onClick={() => signOut()}>
                  <SignOut
                    size={24}
                    color={theme.colors.gray900.value}
                    weight="light"
                  />
                  <Text size="lg">Sair</Text>
                </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <Link href="/login">
          <UserInfoContainer>
            <span>
              Olá, <br /> Faça login
            </span>

            <Avatar />
          </UserInfoContainer>
        </Link>
      )}
    </Container>
  )
}

Header.displayName = 'Header'

export { Header }
