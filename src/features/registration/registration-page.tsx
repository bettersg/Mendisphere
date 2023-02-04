import { Box, Flex } from "@chakra-ui/react";

import RegistrationDesign from "./components/registration-design";
import RegistrationSection from "./components/registration-section";
import "./scss/registration.scss";

export default function RegistrationPage() {
  return (
    <Flex minH="100vH">
      <Box flex="1">
        <RegistrationSection />
      </Box>
      <Box flex="1" className="rounded_edge_rectangle">
        <RegistrationDesign />
      </Box>
    </Flex>
  );
}
