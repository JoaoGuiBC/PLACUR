import { Eye, EyeSlash, IconProps } from "phosphor-react"
import { ComponentProps, ForwardRefExoticComponent, useState } from "react"

import { theme } from "../../../stitches.config"
import { Container, Prefix, ShowPasswordButton, Input } from "./styles"

interface TextInputProps extends ComponentProps<typeof Input> {
  Icon: ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
}

export function TextInput({ Icon, type, placeholder, ...props }: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <Container>
      <Prefix htmlFor={placeholder} >
        <Icon size={32} color={theme.colors.gray900.value} weight="light" />
      </Prefix>

      <Input id={placeholder} type={isPasswordVisible ? 'text' : type} placeholder={placeholder} {...props} />

      {
        type === 'password' && (
          <ShowPasswordButton type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {
              isPasswordVisible
              ? <EyeSlash size={16} color={theme.colors.gray900.value} weight="light" />
              : <Eye size={16} color={theme.colors.gray900.value} weight="light" />
            }
          </ShowPasswordButton>
        )
      }
    </Container>
  )
}

TextInput.displayName = 'TextInput'
