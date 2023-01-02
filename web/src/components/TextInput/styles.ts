import * as BaseLabel from '@radix-ui/react-label'

import { styled } from 'stitches.config'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  height: '3rem',
  overflow: 'clip',
  width: '100%',

  backgroundColor: '$white',
  border: '1px solid $gray300',
  borderRadius: '8px',
})

export const Prefix = styled(BaseLabel.Root, {
  all: 'unset',

  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '3rem',
  height: '3rem',
})

export const ShowPasswordButton = styled('button', {
  all: 'unset',

  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '2rem',
  height: '2rem',
})

export const InputContainer = styled('fieldset', {
  flex: 1,
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column-reverse',
  position: 'relative',

  borderLeft: '1px solid $gray300',
  borderRight: 'none',

  transition: 'all 0.2s',

  '&:focus-within': {
    borderColor: '$blue100',
  },
})

export const Label = styled(BaseLabel.Root, {
  padding: '0 0.5rem',

  fontFamily: '$text',
  fontWeight: '$regular',
  fontSize: '$sm',
  color: '$gray500',

  cursor: 'pointer',
  transform: 'translateY(115%)',

  transition: 'all 0.2s',
})

export const Input = styled('input', {
  flex: 1,
  padding: '0 0.5rem',

  fontFamily: '$text',
  fontWeight: '$medium',
  fontSize: '$sm',
  color: '$gray900',

  border: 'none',
  outline: 'none',

  [`&:focus ~ ${Label},&:not(:placeholder-shown) ~ ${Label}`]: {
    transform: 'translateY(75%)',
    fontSize: '$xs',
  },
})
