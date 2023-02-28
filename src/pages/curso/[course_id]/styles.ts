import { Text } from '@components/index'
import { styled } from 'stitches.config'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
})

export const InfoContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem',
  gap: '1rem',

  width: '53rem',

  backgroundColor: '$white',

  border: '1px solid $gray300',
  borderRadius: '8px',
})

export const ImageInfo = styled('div', {
  display: 'flex',
  gap: '1rem',

  img: {
    borderRadius: '8px',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
})

export const Section = styled('section', {})

export const RegisterContainer = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  gap: '1.5rem',
})

export const Encounter = styled('div', {
  display: 'flex',
  gap: '0.25rem',
  alignItems: 'center',
})

export const DateInfo = styled(Text, {
  color: '$gray500',
})
