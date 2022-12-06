import * as Select from '@radix-ui/react-select'

import { styled } from '../../../stitches.config'

export const SelectRoot = styled(Select.Root, {})

export const SelectTrigger = styled(Select.Trigger, {
  boxSizing: 'border-box',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  padding: '1rem',
  
  width: 'fit-content',
  
  fontFamily: "$text",
  fontWeight: "$medium",
  fontSize: "$sm",
  
  background: '$white',
  border: '1px solid $gray300',
  borderRadius: '8px'
})

export const SelectPortal = styled(Select.Portal, {
  padding: '0.5rem',
  borderRadius: '8px',
  filter: 'drop-shadow(0 8px 8px rgba(0, 0, 0, 0.15))',
  backgroundColor: '$white',
  zIndex: '30'
})

export const Separator = styled('div', {
  width: '100%',
  height: '1px',
  borderRadius: '8px',
  margin: '8px 0',
  backgroundColor: '$gray500'
})

export const SelectItem = styled(Select.Item, {
  userSelect: 'none',
  fontFamily: "$text",
  fontWeight: "$regular",
  fontSize: "$sm",
})