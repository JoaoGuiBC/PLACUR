import * as BaseSeparator from '@radix-ui/react-separator'

import { styled } from 'stitches.config'

export const SearchContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',

  marginBottom: '2rem',

  '@xs': {
    flexDirection: 'row',
  },
})

export const Table = styled('table', {
  marginTop: '0.5rem',
})

export const TableBody = styled('tbody', {
  display: 'block',
  borderRadius: '8px',
  backgroundColor: '$white',

  '& tr': {
    padding: '1rem',
  },

  '& tr:first-child': {
    borderRadius: '8px 8px 0 0',
  },

  '& tr:last-child': {
    borderRadius: '0 0 8px 8px',
  },
})

export const TableRow = styled('tr', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  padding: '0 1rem',

  '@sm': {
    gridTemplateColumns: '2fr 1fr 1fr',
  },
  '@md': {
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
  },
  '@lg': {
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
  },

  '& th': {
    fontFamily: '$heading',
    fontWeight: '$medium',
    fontSize: '$lg',
    color: '$gray900',
    textAlign: 'left',
  },

  '& td:last-child': {
    textAlign: 'right',
    display: 'none',

    '@md': {
      display: 'initial',
    },
  },
  '& th:last-child': {
    textAlign: 'right',
    display: 'none',

    '@md': {
      display: 'initial',
    },
  },

  '& th:nth-child(2)': {
    display: 'none',

    '@lg': {
      display: 'initial',
    },
  },
  '& td:nth-child(2)': {
    display: 'none',

    '@lg': {
      display: 'initial',
    },
  },

  '& th:nth-child(4)': {
    display: 'none',
    textAlign: 'right',

    '@sm': {
      display: 'initial',
    },
    '@md': {
      textAlign: 'left',
    },
  },
  '& td:nth-child(4)': {
    display: 'none',
    textAlign: 'right',

    '@sm': {
      display: 'initial',
    },
    '@md': {
      textAlign: 'left',
    },
  },
})

export const SeparatorTableRow = styled('tr', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  padding: '0 1rem !important',
})

export const Separator = styled(BaseSeparator.Root, {
  width: 'stretch',
  height: '1px',

  borderRadius: '8px',
  backgroundColor: '$gray800',
})
