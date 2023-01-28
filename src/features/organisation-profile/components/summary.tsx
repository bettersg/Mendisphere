import { Flex, Box } from "@chakra-ui/react";
import { Component } from "react";
import "../scss/summary.scss";

class Summary extends Component {
  render() {
    return (
      <Flex className="summaryFlex">
        <Box>This is the summary</Box>
      </Flex>
    );
  }
}

export default Summary;
