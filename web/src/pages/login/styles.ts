import { styled } from '../../../stitches.config'

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

  marginTop: '1rem',
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  width: '20.5rem',

  marginTop: '2rem',

  '& a': {
    marginTop: '1rem',
  },
})

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  width: '100%',
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  marginTop: '2rem',
  width: '100%',
})
