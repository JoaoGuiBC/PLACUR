import Image from "next/image"
import { ComponentProps } from "react"

import { Avatar } from "../Avatar"

import { Container, UserInfoContainer } from "./styles"

interface HeaderProps extends ComponentProps<typeof Container> {}

export function Header(props: HeaderProps) {
  return (
    <Container {...props}>
      <Image src="/logo_egepe.png" alt="Logo EGEPE" quality={100} width={156} height={88} />

      <UserInfoContainer>
        <span>Olá, {'\n'} Faça login</span>

        <Avatar />
      </UserInfoContainer>
    </Container>
  )
}

Header.displayName = 'Header'
