import { ComponentProps, ForwardedRef, forwardRef } from "react";

import { Container, Input, Placeholder } from "./styles";

interface TextAreaProps extends ComponentProps<typeof Input> {
  isErrored?: boolean;
}

const TextArea = forwardRef(
  (
    { placeholder, isErrored = false, ...props }: TextAreaProps,
    ref: ForwardedRef<any>
  ) => {
    return (
      <Container htmlFor={placeholder}>
        <Input ref={ref} id={placeholder} placeholder=" " {...props} />
        <Placeholder isErrored={isErrored}>{placeholder}</Placeholder>
      </Container>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
