import { Check } from 'phosphor-react'
import { ComponentProps } from 'react'

import { Container, CheckboxContainer, CheckboxIndicator } from './styles'

export interface CheckboxProps
  extends ComponentProps<typeof CheckboxContainer> {
  title: string
}

export function Checkbox({ title, ...props }: CheckboxProps) {
  return (
    <Container>
      <CheckboxContainer {...props} id={title}>
        <CheckboxIndicator asChild>
          <Check weight="bold" />
        </CheckboxIndicator>
      </CheckboxContainer>
      <label className="Label" htmlFor={title}>
        {title}
      </label>
    </Container>
  )
}

Checkbox.displayName = 'Checkbox'
