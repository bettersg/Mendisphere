import { extendTheme } from "@chakra-ui/react";

export const appTheme = extendTheme({
  textStyles: {
    breadCrumbLink: {
      fontWeight: "600",
      color: "#3959ff",
      fontSize: "14px",
      textDecoration: "underline",
      textDecorationColor: "#3959ff",
    },
  },
});
