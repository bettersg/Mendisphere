import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { colors } from "../colours";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const tocStyle = definePartsStyle({
  container: {
    borderBottomWidth: "1px", // Set bottom border width
    _first: {
      borderTopWidth: "0", // Remove top border for first item
    },
    _last: {
      borderBottomWidth: "0", // Remove bottom border for last item
    },
  },
  // button: {
  //   _expanded: {
  //     color: colors.brand.primary,
  //   },
  // },
  icon: {
    fontSize: "32px",
    marginLeft: "auto", // Right-align the icon
  },
});

export const Accordion = defineMultiStyleConfig({
  variants: { tocStyle },
});
