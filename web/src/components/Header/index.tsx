import Image from "next/image"
import Link from "next/link"
import { ComponentProps } from "react"

import { Avatar } from "../Avatar"

import { Container, UserInfoContainer } from "./styles"

interface HeaderProps extends ComponentProps<typeof Container> { }

export function Header(props: HeaderProps) {
  return (
    <Container {...props}>
      <Link href="/">
        <Image src="/logo_egepe.png" alt="Logo EGEPE" quality={100} width={156} height={88} />
      </Link>

      <Link href="/login">
        <UserInfoContainer>
          <span>Olá, <br /> Faça login</span>

          <Avatar />
        </UserInfoContainer>
      </Link>
    </Container>
  )
}

Header.displayName = 'Header'
