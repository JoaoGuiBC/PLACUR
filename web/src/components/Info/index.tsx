import type { IconProps } from "phosphor-react"
import type { ComponentProps, ForwardRefExoticComponent } from "react"

import { theme } from "../../../stitches.config"

import { Container } from "./styles"

interface InfoProps extends ComponentProps<typeof Container> {
  Icon: ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
}

export function Info({ children, Icon }: InfoProps) {
  return (
    <Container>
      <Icon size={32} color={theme.colors.gray900.value} weight="light" />
      <span>{children}</span>
    </Container>
  )
}

Info.displayName = 'Info'
