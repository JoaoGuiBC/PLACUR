import { styled } from "../../../stitches.config"

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  gap: '0.5rem',

  width: '26rem',

  background: "$white",

  border: '1px solid $gray300',
  borderRadius: '8px'
})

export const Content = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '0.5rem'
})

export const Title = styled('span', {
  fontFamily: "$text",
  fontWeight: "$regular",
  fontSize: "$sm",
  color: "$blue600"
})

export const InfoBar = styled('div', {
  display: 'flex',
  alignitems: 'flex-start',
  gap: '1rem',

  '& div': {
    '& p': {
      fontFamily: "$text",
      fontWeight: "$regular",
      fontSize: '$sm',

      color: '$gray900',
    },

    '& span': {
      fontFamily: "$text",
      fontWeight: "$regular",
      fontSize: '$xs',

      color: '$gray500',
    }
  }
})
