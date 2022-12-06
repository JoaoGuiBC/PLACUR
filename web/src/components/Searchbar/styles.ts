import { styled } from "../../../stitches.config"

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  height: '3rem',
  overflow: 'clip',
  width: 'fit-content',

  backgroundColor: '$white',
  border: '1px solid $gray300',
  borderRadius: '8px'
})

export const Input = styled('input', {
  flex: 1,
  padding: '1rem',
  
  fontFamily: "$text",
  fontWeight: "$medium",
  fontSize: "$sm",
  color: "$blue900",

  border: 'none',
  outline: 'none'
})

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: '1rem',

  height: '100%',

  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none'
})
