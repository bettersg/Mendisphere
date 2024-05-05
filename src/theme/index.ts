import { extendTheme } from "@chakra-ui/react";

import { fonts, textStyles } from "./typography";
import { Table } from "./components/table";
import { colors } from "./colours";
import { Accordion } from "./components/accordion";

const overrides = {
  fonts,
  textStyles,
  colors,
  // Other foundational style overrides go here
  components: {
    // Other components go here
    Table,
    Accordion,
  },
};

export default extendTheme(overrides);
