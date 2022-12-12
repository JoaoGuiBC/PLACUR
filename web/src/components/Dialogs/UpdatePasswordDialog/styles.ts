import * as Dialog from '@radix-ui/react-dialog'

import { styled } from "../../../../stitches.config"

export const DialogOverlay = styled(Dialog.Overlay, {
  inset: 0,
  position: 'fixed',

  opacity: '0.2',
  backgroundColor: '$gray800',
  animation: 'overlayShow 1050ms cubic-bezier(0.16, 1, 0.3, 1)'
})

export const DialogContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  isolation: 'isolate',

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  background: '$white',
  border: '1px solid $gray300',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px'
})

export const DialogTitle = styled(Dialog.Title, {
  fontFamily: '$heading',
  fontWeight: '$medium',
  fontSize: "$xl",
  color: "$gray900"
})

export const DialogDescription = styled(Dialog.Description, {
  fontFamily: '$text',
  fontWeight: '$regular',
  fontSize: "$sm",
  color: "$gray800",
  textAlign: 'justify',
  maxWidth: '20rem'
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  width: '100%',
  marginTop: '1rem'
})

export const CloseButton = styled('button', {
  all: 'unset',

  position: 'absolute',
  right: 0,
  top: 0,

  cursor: 'pointer'
})
