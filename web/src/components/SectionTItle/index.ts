import { ComponentProps } from "react"

import { styled } from "../../../stitches.config"

export const SectionTitle = styled('h1', {
  fontFamily: '$heading',
  fontWeight: '$medium',
  fontSize: "$xl",
  color: "$blue600"
})

interface SectionTitleProps extends ComponentProps<typeof SectionTitle> {}

SectionTitle.displayName = 'SectionTitle'
