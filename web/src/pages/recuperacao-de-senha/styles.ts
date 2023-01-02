import { styled } from 'stitches.config'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const Span = styled('span', {
  fontFamily: '$text',
  fontWeight: '$regular',
  fontSize: '$sm',
  color: '$gray800',
  textAlign: 'center',

  marginTop: '1rem',
  maxWidth: '21.5rem',
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  width: '20.5rem',

  marginTop: '2rem',
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  marginTop: '2rem',
  width: '100%',
})
