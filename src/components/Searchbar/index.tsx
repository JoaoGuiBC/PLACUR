import type { ComponentProps } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

import { theme } from 'stitches.config'
import { Container, Input, Button } from './styles'

interface SearchbarProps extends ComponentProps<typeof Input> {}

function Searchbar(props: SearchbarProps) {
  return (
    <Container>
      <Input {...props} />
      <Button>
        <MagnifyingGlass
          size={16}
          color={theme.colors.gray900.value}
          weight="light"
        />
      </Button>
    </Container>
  )
}

Searchbar.displayName = 'Searchbar'

export { Searchbar }
