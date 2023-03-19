import { Text } from '@components/Text'
import { styled } from 'stitches.config'

export const Container = styled('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: '0.5rem',
  gap: '0.5rem',
  overflow: 'clip',

  width: 'calc(100% - 1rem)',

  background: '$white',

  border: '1px solid $gray300',
  borderRadius: '8px',

  transition: 'all 0.2s',

  '&:hover': {
    transform: 'translateY(-8px) scale(1.025)',
    filter: 'drop-shadow(0 8px 8px rgba(0, 0, 0, 0.15))',
    zIndex: 20,
  },
})

export const Content = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '0.5rem',

  [`${Text}`]: {
    color: '$blue600',
  },
})

export const InfoBar = styled('div', {
  [`${Text}:first-child`]: {
    color: '$gray900',
  },

  [`${Text}:last-child`]: {
    color: '$gray500',
  },

  '& div': {
    display: 'flex',
    flexDirection: 'column',
  },
})
