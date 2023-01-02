import { styled } from '../../../stitches.config'

export const Container = styled('div', {
  display: 'flex',
  gap: '0.25rem',

  '& span': {
    display: 'flex',
    paddingTop: '4px',
  },
})

export const PaginationItem = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fontFamily: '$text',
  fontWeight: '$regular',
  fontSize: '$sm',
  color: '$gray900',

  width: '1.5rem',
  height: '1.5rem',

  cursor: 'pointer',
  borderRadius: '8px',
  backgroundColor: '$white',

  transition: 'all 0.2s',

  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)',
    filter: 'drop-shadow(0 8px 8px rgba(0, 0, 0, 0.15))',
    zIndex: 20,
  },

  variants: {
    isCurrentPage: {
      true: {
        border: '1px solid $blue100',
      },
      false: {
        border: '1px solid $gray300',
      },
    },
  },

  defaultVariants: {
    isCurrentPage: 'false',
  },
})
