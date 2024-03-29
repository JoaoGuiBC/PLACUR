import { ComponentProps } from 'react'

import { styled } from 'stitches.config'

const Button = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  $$baseColor: '$colors$blue600',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',

  height: '3rem',
  overflow: 'clip',
  width: '100%',
  padding: '0 1.5rem',

  fontFamily: '$text',
  fontWeight: '$regular',
  fontSize: '$sm',

  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: '8px',

  cursor: 'pointer',
  transition: 'all 0.2s',

  '&:disabled': {
    cursor: 'not-allowed',
    filter: 'brightness(75%)',
  },

  '& svg': {
    '& path': {
      transition: 'all 0.2s',
      stroke: '$$baseColor',
    },
    '& line': {
      transition: 'all 0.2s',
      stroke: '$$baseColor',
    },
    '& circle': {
      transition: 'all 0.2s',
      stroke: '$$baseColor',
    },
    '& rect': {
      transition: 'all 0.2s',
      color: '$$baseColor',
    },
  },

  variants: {
    variant: {
      primary: {
        color: '$white',
        borderColor: '$$baseColor',
        background: '$$baseColor',

        '&:not(:disabled):hover': {
          background: 'transparent',
          color: '$$baseColor',
        },
      },

      secondary: {
        $$baseColor: '$colors$gray500',

        color: '$$baseColor',
        borderColor: '$$baseColor',
        background: '$transparent',

        '&:not(:disabled):hover': {
          background: '$$baseColor',
          color: '$white',
        },
      },

      withIcon: {
        borderColor: '$$baseColor',
        background: '$transparent',

        height: 'fit-content',
        padding: '0.5rem',

        '&:not(:disabled):hover': {
          background: '$$baseColor',

          '& svg': {
            '& path': {
              stroke: '$white',
            },
            '& line': {
              stroke: '$white',
            },
            '& circle': {
              stroke: '$white',
            },
            '& rect': {
              color: '$white',
            },
          },
        },
      },
    },

    size: {
      min: {
        width: 'fit-content',
      },
      max: {
        width: '100%',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'max',
  },
})

export interface ButtonProps extends ComponentProps<typeof Button> {}

Button.displayName = 'Button'

export { Button }
