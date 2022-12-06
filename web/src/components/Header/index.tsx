import Image from "next/image"

import { Avatar } from "../Avatar"

import { Container, UserInfoContainer } from "./styles"

export function Header() {
  return (
    <Container>
      <Image src="/logo_egepe.png" alt="Logo EGEPE" quality={100} width={156} height={88} />

      <UserInfoContainer>
        <span>Olá, {'\n'} Faça login</span>

        <Avatar />
      </UserInfoContainer>
    </Container>
  )
}
