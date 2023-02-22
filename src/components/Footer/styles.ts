import { styled } from 'stitches.config'

export const Container = styled('footer', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0 1rem',

  backgroundColor: '$white',

  '@md': {
    padding: '1rem 5rem',
  },
})

export const Contacts = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})
