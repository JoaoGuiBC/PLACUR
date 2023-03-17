import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Text } from '@components/Text'
import { styled } from 'stitches.config'

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',

  background: '$blue800',

  '@md': {
    padding: '0 5rem',
  },
})

export const UserInfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',

  '& span': {
    fontFamily: '$text',
    fontWeight: '$medium',
    fontSize: '1rem',
    textAlign: 'right',
    textTransform: 'capitalize',

    color: '$gray100',
  },
})

export const DropdownMenuContent = styled(DropdownMenu.Content, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0.5rem',
  gap: '0.5rem',
  isolation: 'isolate',
  alignSelf: 'flex-end',
  position: 'relative',

  background: '$white',

  border: '1px solid $gray300',
  filter: 'drop-shadow(0 8px 8px rgba(0, 0, 0, 0.15))',
  borderRadius: '8px',
})

export const DropdownMenuSubContent = styled(DropdownMenu.SubContent, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0.5rem',
  gap: '0.5rem',
  isolation: 'isolate',
  alignSelf: 'flex-end',
  position: 'relative',

  background: '$white',

  border: '1px solid $gray300',
  filter: 'drop-shadow(0 8px 8px rgba(0, 0, 0, 0.15))',
  borderRadius: '8px',
})

export const DropdownMenuArrow = styled(DropdownMenu.Arrow, {
  position: 'absolute',
  right: '96px',

  fill: '$white',
})

export const DropdownMenuItem = styled(DropdownMenu.Item, {
  width: '100%',
  userSelect: 'none',

  '& a': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '0.25rem',
  },

  [`${Text}`]: {
    textAlign: 'left',
    color: '$gray900',
  },
})

export const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger, {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.25rem',

  width: '100%',
  cursor: 'pointer',
  userSelect: 'none',

  [`${Text}`]: {
    textAlign: 'left',
    color: '$gray900',
  },
})

export const SignOutButton = styled('button', {
  all: 'unset',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.25rem',
  cursor: 'pointer',
})
