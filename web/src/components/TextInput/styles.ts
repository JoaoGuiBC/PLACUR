import * as Label from '@radix-ui/react-label'

import { styled } from "../../../stitches.config"

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  height: '3rem',
  overflow: 'clip',
  width: '100%',

  backgroundColor: '$white',
  border: '1px solid $gray300',
  borderRadius: '8px'
})

export const Prefix = styled(Label.Root, {
  all: 'unset',

  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '3rem',
  height: '3rem',

  borderRight: '1px solid $gray300'
})

export const Input = styled('input', {
  flex: 1,
  padding: '0.5rem',
  
  fontFamily: "$text",
  fontWeight: "$medium",
  fontSize: "$sm",
  color: "$blue900",

  height: '100%',

  border: 'none',
  outline: 'none'
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
