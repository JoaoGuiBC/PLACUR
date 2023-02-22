import { ComponentProps, ElementType } from 'react'

import { styled } from 'stitches.config'

const Heading = styled('h1', {
  fontFamily: '$heading',
  fontWeight: '$medium',
  lineHeight: '125%',

  margin: 0,

  variants: {
    style: {
      primary: {
        color: '$blue600',
      },
      secondary: {
        color: '$gray900',
      },
    },
    size: {
      sm: { fontSize: '$md' },
      md: { fontSize: '$lg' },
      lg: { fontSize: '$xl' },
    },
  },

  defaultVariants: {
    style: 'primary',
    size: 'lg',
  },
})

export interface HeadingProps extends ComponentProps<typeof Heading> {
  as?: ElementType
}

Heading.displayName = 'Heading'

export { Heading }
