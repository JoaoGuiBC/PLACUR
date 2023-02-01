import { styled } from 'stitches.config'

export const ActionsContainer = styled('div', {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',

  marginBottom: '2rem',

  height: 'fit-content',
  width: '100%',
})

export const CoursesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '0.5rem',

  marginTop: '1rem',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@lg': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
})
