import { Flex, Box } from "@chakra-ui/react";
import { Component } from "react";
import "../scss/similar-orgs.scss";

class SimilarOrgs extends Component {
  render() {
    return (
      <Flex className="similarOrgsFlex">
        <Box>This is the similar orgs component</Box>
      </Flex>
    );
  }
}

export default SimilarOrgs;
