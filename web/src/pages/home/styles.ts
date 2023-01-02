import { styled } from '../../../stitches.config'

export const FilterContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  marginBottom: '2rem',

  height: 'fit-content',

  '@xs': {
    flexDirection: 'row',
  },
})

export const CoursesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '0.5rem',

  marginTop: '1.25rem',
  marginBottom: '3rem',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@lg': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
})
