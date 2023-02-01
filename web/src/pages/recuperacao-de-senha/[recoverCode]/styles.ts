import { Text } from '@components/Text'
import { styled } from 'stitches.config'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Text}`]: {
    marginTop: '1rem',
    maxWidth: '21.5rem',
    textAlign: 'center',
  },
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  width: '20.5rem',

  marginTop: '2rem',
})

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  width: '100%',
  marginBottom: '2rem',
})
