import * as Checkbox from '@radix-ui/react-checkbox'
import { keyframes, styled } from '../../../stitches.config'

const slideIn = keyframes({
  from: {
    transform: 'translateY(-100%)',
  },
  to: {
    transform: 'translateY(0)',
  },
})
const slideOut = keyframes({
  from: {
    transform: 'translateY(0)',
  },
  to: {
    transform: 'translateY(-100%)',
  },
})

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  '& label': {
    fontFamily: '$text',
    fontWeight: '$regular',
    fontSize: '$sm',
    color: '$gray900',
    cursor: 'pointer',
  },
})

export const CheckboxContainer = styled(Checkbox.Root, {
  all: 'unset',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '1.5rem',
  height: '1.5rem',
  boxSizing: 'border-box',

  overflow: 'hidden',
  borderRadius: '4px',
  backgroundColor: '$white',
  cursor: 'pointer',
  border: '1px solid $gray300',

  '&:focus': {
    border: '1px solid $blue100',
  },
})

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$blue100',
  width: '1.25rem',
  height: '1.25rem',

  '&[data-state="checked"]': {
    animation: `${slideIn} 200ms ease-out`,
  },

  '&[data-state="unchecked"]': {
    animation: `${slideOut} 200ms ease-out`,
  },
})
