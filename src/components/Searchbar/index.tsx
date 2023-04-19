import { MagnifyingGlass } from 'phosphor-react'
import type { ComponentProps, FormEvent } from 'react'

import { theme } from 'stitches.config'
import { Container, Input, Button } from './styles'

interface SearchbarProps extends ComponentProps<typeof Input> {
  onSearch: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

function Searchbar({ onSearch, ...props }: SearchbarProps) {
  return (
    <Container onSubmit={(event) => onSearch(event)}>
      <Input {...props} />
      <Button type="submit">
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
