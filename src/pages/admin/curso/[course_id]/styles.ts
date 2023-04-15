import { styled } from 'stitches.config'

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  alignSelf: 'center',
  alignItems: 'center',

  padding: '2rem',
  minWidth: '20rem',
  width: 'calc(100% - 25rem)',

  background: '$gray300',
  borderRadius: '8px',

  '& > span': {
    fontSize: '$sm',
    color: '$red500',
  },
})
