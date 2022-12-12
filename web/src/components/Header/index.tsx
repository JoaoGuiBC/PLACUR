import Link from "next/link"
import Image from "next/image"
import { ComponentProps } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { BookBookmark, CaretRight, Gear, IdentificationBadge, SignOut, UsersFour } from "phosphor-react"

import { Avatar } from "../Avatar"
import { Separator } from "../Separator"

import { theme } from "../../../stitches.config"
import {
  Container,
  DropdownMenuContent,
  DropdownMenuSubContent,
  UserInfoContainer,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuSubTrigger
} from "./styles"

interface HeaderProps extends ComponentProps<typeof Container> { }

export function Header(props: HeaderProps) {
  return (
    <Container {...props}>
      <Link href="/">
        <Image src="/logo_egepe.png" alt="Logo EGEPE" quality={100} width={156} height={88} priority />
      </Link>

      {/*<Link href="/login">
        <UserInfoContainer>
          <span>Olá, <br /> Faça login</span>

          <Avatar />
        </UserInfoContainer>
        </Link>*/}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <UserInfoContainer>
            <span>Olá, <br /> João Guilherme Da Rocha</span>

            <Avatar src="https://github.com/JoaoGuiBC.png" />
          </UserInfoContainer>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuArrow />

            <DropdownMenuItem>
              <Link href="/perfil">
                <IdentificationBadge size={24} color={theme.colors.gray900.value} weight="light" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>

            <Separator />
            <DropdownMenuItem>
              <Link href="/perfil/meus-cursos">
                <BookBookmark size={24} color={theme.colors.gray900.value} weight="light" />
                <span>Meus cursos</span>
              </Link>
            </DropdownMenuItem>

            <Separator />
            <DropdownMenu.Sub>
              <DropdownMenuSubTrigger>
                <Gear size={24} color={theme.colors.gray900.value} weight="light" />
                <span>Administrar plataforma</span>
                <CaretRight size={16} color={theme.colors.gray900.value} weight="light" />
              </DropdownMenuSubTrigger>

              <DropdownMenu.Portal>
                <DropdownMenuSubContent sideOffset={16}>
                  <DropdownMenuItem>
                    <UsersFour size={24} color={theme.colors.gray900.value} weight="light" />
                    <span>Usuários</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <BookBookmark size={24} color={theme.colors.gray900.value} weight="light" />
                    <span>Cursos</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <Separator />
            <DropdownMenuItem>
              <Link href="/">
                <SignOut size={24} color={theme.colors.gray900.value} weight="light" />
                <span>Sair</span>
              </Link>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Container>
  )
}

Header.displayName = 'Header'
