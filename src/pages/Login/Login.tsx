import { Box, Flex } from "@chakra-ui/react";
import LoginDesign from "./LoginDesign";
import LoginSection from "./LoginSection";
import "./style.scss";

const Login = () => {
  return (
    <Flex minH="100vH">
      <Box flex="1">
        <LoginSection />
      </Box>
      <Box flex="1" className="rounded_edge_rectangle">
        <LoginDesign />
      </Box>
    </Flex>
  );
};

export default Login;
