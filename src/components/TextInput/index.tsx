import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from "react";
import { Eye, EyeSlash, IconProps } from "phosphor-react";

import { theme } from "stitches.config";
import {
  Container,
  Prefix,
  ShowPasswordButton,
  Input,
  InputContainer,
  Placeholder,
} from "./styles";

interface TextInputProps extends ComponentProps<typeof Input> {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  isErrored?: boolean;
}

const TextInput = forwardRef(
  (
    { Icon, isErrored = false, type, placeholder, ...props }: TextInputProps,
    ref: ForwardedRef<any>
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <Container htmlFor={placeholder}>
        <Prefix>
          <Icon size={32} color={theme.colors.gray900.value} weight="light" />
        </Prefix>

        <InputContainer isErrored={isErrored}>
          <Input
            ref={ref}
            id={placeholder}
            type={isPasswordVisible ? "text" : type}
            placeholder=" "
            {...props}
          />
          <Placeholder isErrored={isErrored}>{placeholder}</Placeholder>
        </InputContainer>

        {type === "password" && (
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
              <Eye
                size={16}
                color={theme.colors.gray900.value}
                weight="light"
              />
            )}
          </ShowPasswordButton>
        )}
      </Container>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput };
