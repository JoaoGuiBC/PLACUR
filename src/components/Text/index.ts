import { ComponentProps, ElementType } from 'react'

import { styled } from 'stitches.config'

const Text = styled('span', {
  fontFamily: '$text',
  fontWeight: '$regular',
  color: '$gray800',
  lineHeight: '160%',

  margin: 0,

  variants: {
    size: {
      sm: { fontSize: '$xs' },
      md: { fontSize: '$sm' },
      lg: { fontSize: '$md' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export interface TextProps extends ComponentProps<typeof Text> {
  as?: ElementType
}

Text.displayName = 'Text'

export { Text }
