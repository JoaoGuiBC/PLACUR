import { styled } from 'stitches.config'

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 11rem - 5.5rem)',
  padding: '5.5rem 1rem 3rem',

  '@md': {
    padding: '6.5rem 5rem 4rem',
  },
})
