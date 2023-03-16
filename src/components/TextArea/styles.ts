import * as BaseLabel from "@radix-ui/react-label";

import { styled } from "stitches.config";

export const Container = styled(BaseLabel.Root, {
  position: "relative",
  display: "flex",
  flexDirection: "column-reverse",

  width: "100%",

  overflow: "clip",
  backgroundColor: "$white",
  border: "1px solid $gray300",
  borderRadius: "8px",

  cursor: "pointer",
});

export const Placeholder = styled("div", {
  position: "absolute",

  left: "0.5rem",
  top: "50%",
  transform: "translateY(-50%)",

  fontFamily: "$text",
  fontWeight: "$regular",
  fontSize: "$md",

  cursor: "pointer",
  zIndex: 10,

  transition: "all 0.2s",

  variants: {
    isErrored: {
      true: {
        color: "$red500",
      },
      false: {
        color: "$gray500",
      },
    },
  },

  defaultVariants: { isErrored: "false" },
});

export const Input = styled("textarea", {
  padding: "1.5rem 0.5rem 0",
  width: "stretch",
  minHeight: "4rem",

  fontFamily: "$text",
  fontWeight: "$medium",
  fontSize: "$sm",
  color: "$gray900",

  border: "none",
  outline: "none",
  resize: "vertical",

  [`&:focus ~ ${Placeholder},&:not(:placeholder-shown) ~ ${Placeholder}`]: {
    top: "0.5rem",
    transform: "translateY(0)",
    fontSize: "$sm",
  },
});
