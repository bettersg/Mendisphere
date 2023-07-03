import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

export const appTheme = extendTheme({
  fonts: {
    body: `'Inter', sans-serif`,
  },
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
    Steps,
    Table: {
      variants: {
        orgListings: {
          table: {
            tableLayout: "fixed",
          },
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
              _hover: {
                bgColor: "#3959FF",
                color: "white",
              },
            },
          },
        },
      },
    },
  },
});
