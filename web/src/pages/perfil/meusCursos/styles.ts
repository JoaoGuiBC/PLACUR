import * as BaseSeparator from "@radix-ui/react-separator"

import { styled } from "../../../../stitches.config"

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem'
})

export const QuantityInfoContainer = styled('div', {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',

  '& h2': {
    fontFamily: '$heading',
    fontWeight: '$medium',
    fontSize: '$lg',

    color: '$gray900'
  }
})

export const Separator = styled(BaseSeparator.Root, {
  height: '2rem',
  width: '1px',
  backgroundColor: '$gray900',
})

export const CoursesContainer = styled('div', {
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  gridGap: '3rem',

  width: '100%',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr'
  }
})

export const CoursesSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.5rem',

  '& h2': {
    fontFamily: '$heading',
    fontWeight: '$medium',
    fontSize: "$md",
    color: "$blue600"
  }
})
