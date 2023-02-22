import { ComponentProps } from 'react'
import { MapPin, WhatsappLogo } from 'phosphor-react'

import { Info } from '../Info'
import { Heading } from '../Heading'

import { Contacts, Container } from './styles'

interface FooterProps extends ComponentProps<typeof Container> {}

function Footer(props: FooterProps) {
  return (
    <Container {...props}>
      <Contacts>
        <Heading>Contato</Heading>
        <Info Icon={MapPin}>Rua de exemplo, 123</Info>
        <Info Icon={WhatsappLogo}>Telefone: (44) 99887-6654</Info>
      </Contacts>
    </Container>
  )
}

Footer.displayName = 'Footer'

export { Footer }
