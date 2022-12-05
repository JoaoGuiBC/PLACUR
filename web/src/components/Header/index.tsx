import Image from "next/image"

import { Container, UserInfoContainer } from "./styles"

export function Header() {
  return (
    <Container>
      <Image src="/logo_egepe.png" alt="Logo EGEPE" quality={100} width={156} height={88} />

      <UserInfoContainer>
        <span>Olá, {'\n'} Faça login</span>

        <Image src="/user_image_placeholder" alt="usuário" quality={100} width={40} height={40}  />
      </UserInfoContainer>
    </Container>
  )
}