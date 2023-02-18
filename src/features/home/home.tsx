import FrontPage from "./components/FrontPage";
import NavigationBar from "./components/NavigationBar";
import Footer from "../common/footer";
import { Box, VStack } from "@chakra-ui/react";
import { Component } from "react";

class Home extends Component {

  render() {
    return (
      <VStack spacing={0} align="stretch">
        <Box minH="10vh">
          <NavigationBar />
        </Box>
        <Box minH="88.5vh">
          <FrontPage />
        </Box>
        <Box h="81.3vh" bg="pink.100">
          Get connected to what matters most.
        </Box>
        <Box h="100vh" bg="blue.100">
          Hear their stories!
        </Box>
        <Box h="81.6vh" bg="green.100">
          How does MindBetter work?
        </Box>
        <Box h="54.7vh" bg="blue.100">
          Go faster, together
        </Box>
        <Box minH="37.33vh">
          <Footer />
        </Box>
      </VStack>
    );
  }
}

export default Home;
