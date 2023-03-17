import { styled } from 'stitches.config'

import { Text } from '../Text'

export const MultiStepContainer = styled('div', {
  margin: '1rem 0',
  width: '100%',
})

export const Label = styled(Text, {
  color: '$gray500',
  userSelect: 'none',

  defaultVariants: {
    size: 'sx',
  },
})

export const Steps = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--steps-size), 1fr)',
  gap: '0.5rem',
  marginTop: '0.25rem',
})

export const Step = styled('div', {
  height: '0.25rem',
  borderRadius: '8px',
  backgroundColor: '$gray500',

  variants: {
    active: {
      true: {
        backgroundColor: '$gray800',
      },
    },
  },
})
