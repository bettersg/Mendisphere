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
    tableHeader: {},
  },
  components: {
    Table: {
      variants: {
        orgListings: {
          th: {
            fontWeight: "400",
            fontSize: "12px",
            letterSpacing: "0.2em",
          },
          thead: {
            borderBottom: "1px solid #707070",
          },
          tbody: {
            tr: {
              borderBottom: "1px solid #CBCBCB",
              fontSize: "12px",
            },
          },
        },
      },
    },
  },
});
