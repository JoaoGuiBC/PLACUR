import type {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react'
import type { IconProps } from 'phosphor-react'

import { Text } from '@components/Text'

import { theme } from 'stitches.config'
import { Container } from './styles'

interface InfoProps extends ComponentProps<typeof Container> {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

function Info({ children, Icon }: InfoProps) {
  return (
    <Container>
      <Icon size={32} color={theme.colors.gray900.value} weight="light" />
      <Text size="lg">{children}</Text>
    </Container>
  )
}

Info.displayName = 'Info'

export { Info }
