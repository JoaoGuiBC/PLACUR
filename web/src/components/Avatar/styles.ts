import * as Avatar from '@radix-ui/react-avatar'

import { styled } from 'stitches.config'

export const AvatarRoot = styled(Avatar.Root, {
  userSelect: 'none',
  width: '40px',
  height: '40px',
  borderRadius: '100%',
  backgroundColor: '$gray100',
})

export const AvatarImage = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

export const AvatarFallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
