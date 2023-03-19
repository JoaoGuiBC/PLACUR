import { NextSeo } from 'next-seo'

import { Container } from './styles'
import { Heading, Text } from '@components/index'

export default function Custom404() {
  return (
    <>
      <NextSeo
        title="Página não encontrada | PLACUR"
        description="Infelizmente parece que a página que você procura não existe."
      />

      <Container>
        <Heading>Página não encontrada</Heading>
        <Text size="lg">
          Infelizmente parece que a página que você procura não existe.
        </Text>
      </Container>
    </>
  )
}
