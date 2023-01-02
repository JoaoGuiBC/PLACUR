import { styled } from '../../../stitches.config'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',

  '& span': {
    fontFamily: '$text',
    fontWeight: '$regular',
    fontSize: '1rem',

    color: '$gray900',
  },
})
