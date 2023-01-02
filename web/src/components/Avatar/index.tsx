import { User } from 'phosphor-react'
import { ComponentProps } from 'react'

import { theme } from '../../../stitches.config'
import { AvatarRoot, AvatarImage, AvatarFallback } from './styles'

interface AvatarProps extends ComponentProps<typeof AvatarRoot> {
  src?: string
}

export function Avatar({ src, ...rest }: AvatarProps) {
  return (
    <AvatarRoot {...rest}>
      <AvatarImage src={src} alt="usuário" />
      <AvatarFallback>
        <User size={40} color={theme.colors.gray900.value} weight="light" />
      </AvatarFallback>
    </AvatarRoot>
  )
}

Avatar.displayName = 'Avatar'
