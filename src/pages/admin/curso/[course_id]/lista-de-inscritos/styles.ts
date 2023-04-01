import { Text } from "@components/index";
import { styled } from "stitches.config";

export const FunctionsContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

export const ListContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  alignItems: "center",
  padding: "1rem",
  marginTop: "1rem",

  background: "$white",
  borderRadius: "8px",
  alignSelf: "stretch",
});

export const UserRow = styled("main", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",

  padding: 0,

  alignSelf: "stretch",
});

export const UserData = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const UserName = styled(Text, {
  fontWeight: "$medium",
});

export const UserInfo = styled(Text, {
  color: "$gray500",
});
