import { MagnifyingGlass } from "phosphor-react"
import type { InputHTMLAttributes } from "react"

import { theme } from "../../../stitches.config"
import { Container, Input, Button } from './styles'

interface SearchbarProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Searchbar(props: SearchbarProps) {
  return (
    <Container>
      <Input {...props} />
      <Button>
        <MagnifyingGlass size={16} color={theme.colors.gray900.value} weight="light" />
      </Button>
    </Container>
  )
}