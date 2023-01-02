import { styled } from 'stitches.config'

export const Container = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',

  backgroundColor: '$white',

  '@sm': {
    flexDirection: 'row',
  },
  '@md': {
    padding: '0 5rem',
  },
})

export const Contacts = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const InstitutionalLogos = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
})
