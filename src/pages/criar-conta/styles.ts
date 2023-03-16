import { Text } from "@components/Text";
import { styled } from "stitches.config";

export const Container = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",

  width: "30rem",
});

export const HeaderContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",

  [`& ${Text}`]: {
    textAlign: "center",
  },
});

export const FormContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  gap: "0.5rem",
  width: "calc(100% - 4rem)",

  background: "$gray300",
  borderRadius: "8px",
});
