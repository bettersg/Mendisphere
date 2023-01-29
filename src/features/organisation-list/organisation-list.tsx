import { Box, VStack } from "@chakra-ui/react";
import { Component } from "react";
import Footer from "../common/footer";
import SimpleNavigationBar from "../common/simple-header/simple-navbar";
import HeaderBreadCrumbs from "../common/breadcrumbs/header-breadcrumbs";

class OrganisationList extends Component {
  //TODO: Need to add another lifecycle method to prevent double requests in react

  render() {
    return (
      <VStack spacing={0} align="stretch">
        <Box minH="11.11vh">
          <SimpleNavigationBar />
        </Box>
        <HeaderBreadCrumbs />
        <Box minH="53.11vh" bg="tomato">
          2
        </Box>
        <Box minH="20.22vh" bg="pink.100">
          3
        </Box>
        <Box minH="183.33vh" bg="blue.100">
          4
        </Box>
        <Box minH="37.33vh">
          <Footer />
        </Box>
      </VStack>
    );
  }
}

export default OrganisationList;
