import { ComponentProps } from 'react'

import { styled } from '../../../stitches.config'

export const SectionTitle = styled('h1', {
  fontFamily: '$heading',
  fontWeight: '$medium',
  fontSize: '$xl',

  variants: {
    style: {
      primary: {
        color: '$blue600',
      },
      secondary: {
        color: '$gray900',
      },
    },
  },

  defaultVariants: {
    style: 'primary',
  },
})

export interface SectionTitleProps
  extends ComponentProps<typeof SectionTitle> {}

SectionTitle.displayName = 'SectionTitle'
