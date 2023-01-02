import {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from 'react'
import { Eye, EyeSlash, IconProps } from 'phosphor-react'

import { theme } from 'stitches.config'
import {
  Container,
  Prefix,
  ShowPasswordButton,
  Input,
  InputContainer,
  Label,
} from './styles'

interface TextInputProps extends ComponentProps<typeof Input> {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

function TextInput({ Icon, type, placeholder, ...props }: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <Container>
      <Prefix htmlFor={placeholder}>
        <Icon size={32} color={theme.colors.gray900.value} weight="light" />
      </Prefix>

      <InputContainer>
        <Input
          id={placeholder}
          type={isPasswordVisible ? 'text' : type}
          placeholder=" "
          {...props}
        />
        <Label htmlFor={placeholder}>{placeholder}</Label>
      </InputContainer>

      {type === 'password' && (
        <ShowPasswordButton
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <EyeSlash
              size={16}
              color={theme.colors.gray900.value}
              weight="light"
            />
          ) : (
            <Eye size={16} color={theme.colors.gray900.value} weight="light" />
          )}
        </ShowPasswordButton>
      )}
    </Container>
  )
}

TextInput.displayName = 'TextInput'

export { TextInput }
