import { Box, Flex } from "@chakra-ui/react";

import RegistrationDesign from "./registrationDesign";
import RegistrationSection from "./registrationSection";
import "./registration.scss";

const Registration = () => {
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

export default Registration;
