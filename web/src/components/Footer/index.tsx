import Image from 'next/image'
import { ComponentProps } from 'react'
import { MapPin, WhatsappLogo } from 'phosphor-react'

import { Info } from '../Info'
import { SectionTitle } from '../SectionTitle'

import { Contacts, Container, InstitutionalLogos } from './styles'

interface FooterProps extends ComponentProps<typeof Container> {}

function Footer(props: FooterProps) {
  return (
    <Container {...props}>
      <Contacts>
        <SectionTitle>Contato</SectionTitle>
        <Info Icon={MapPin}>Rua paraguai, 401 - Nações</Info>
        <Info Icon={WhatsappLogo}>Telefone: (47) 98821-2008</Info>
      </Contacts>

      <InstitutionalLogos>
        <Image
          src="/info/egepe_info_logo.png"
          alt="logo EGEPE"
          width={134.93}
          height={88}
        />
        <Image
          src="/info/ciasp_info_logo.png"
          alt="logo CIASP"
          width={134.93}
          height={88}
        />
        <Image
          src="/info/sga_info_logo.png"
          alt="logo Secretaria de Gestão Administrativa"
          width={134.93}
          height={88}
        />
        <Image
          src="/info/prefeitura_bc_info_logo.png"
          alt="logo Prefeitura de Balneario Camboriu"
          width={134.93}
          height={88}
        />
      </InstitutionalLogos>
    </Container>
  )
}

Footer.displayName = 'Footer'

export { Footer }
