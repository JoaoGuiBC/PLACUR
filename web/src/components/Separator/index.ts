import type { ComponentProps } from 'react'
import * as BaseSeparator from '@radix-ui/react-separator'

import { styled } from '../../../stitches.config'

export const Separator = styled(BaseSeparator.Root, {
  $$baseColor: '$colors$gray300',

  backgroundColor: '$$baseColor',
  borderRadius: '8px',

  variants: {
    direction: {
      horizontal: {
        width: '100%',
        height: '1px'
      },
      vertical: {
        width: '1px',
        height: '100%'
      }
    }
  },

  defaultVariants: {
    direction: 'horizontal'
  }
})

interface SeparatorProps extends ComponentProps<typeof Separator> {}

Separator.displayName = 'Separator'
