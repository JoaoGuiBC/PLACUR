import {
  Root,
  Title,
  Close,
  Provider,
  Viewport,
  Description,
} from '@radix-ui/react-toast'
import { styled, keyframes } from 'stitches.config'

const slideOut = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(calc(100% + 25px))' },
})

const slideIn = keyframes({
  from: { transform: 'translateX(calc(100% + 25px))' },
  to: { transform: 'translateX(0)' },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: 'translateX(calc(100% + 25px))' },
})

export const ToastProvider = styled(Provider, {})

export const ToastRoot = styled(Root, {
  position: 'relative',
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'column',

  padding: '1rem',
  borderRadius: '8px',
  backgroundColor: '$white',
  border: '1px solid $gray300',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px',

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideOut} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: 'translateX(var(--radix-toast-swipe-move-x))',
  },
  '&[data-swipe="cancel"]': {
    transform: 'translateX(0)',
    transition: 'transform 200ms ease-out',
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },
})

export const ToastTitle = styled(Title, {
  fontFamily: '$text',
  fontWeight: '$medium',

  variants: {
    type: {
      message: {
        color: '$blue100',
      },
      error: {
        color: '$red500',
      },
      success: {
        color: '$green500',
      },
    },
  },

  defaultVariants: { type: 'message' },
})

export const ToastDescription = styled(Description, {
  fontFamily: '$text',
  fontWeight: '$regular',
  color: '$gray900',
  fontSize: '0.85rem',
})

export const ToastClose = styled(Close, {
  all: 'unset',
  position: 'absolute',
  right: '0.5rem',
  top: '0.5rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '0.5rem',
  cursor: 'pointer',
})

export const ToastViewport = styled(Viewport, {
  position: 'fixed',
  bottom: 0,
  right: 0,

  width: '23rem',
  maxWidth: '100vw',

  margin: 0,
  padding: '1.5rem',

  zIndex: 1000,
  outline: 'none',
  listStyle: 'none',
})
