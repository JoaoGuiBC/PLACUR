import { styled } from '../../../../stitches.config'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',

  width: '100%',
})

export const PageHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  '& input': {
    display: 'none',
  },

  '@sm': {
    flexDirection: 'row',
  },
})

export const Label = styled('label', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  cursor: 'pointer',

  '& span': {
    fontFamily: '$text',
    fontWeight: '$regular',
    fontSize: '$xs',
    color: '$gray800',
  },
})

export const Content = styled('div', {
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  gridGap: '1rem',

  width: '100%',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr',
    gridGap: '0',
  },
})

export const UserInfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '0 2rem',
})

export const UserInfoSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const Title = styled('h2', {
  fontFamily: '$text',
  fontWeight: '$regular',
  fontSize: '$md',
  color: '$gray900',
})
