import { Flex, Text } from "@chakra-ui/react";
import "../../page-style.scss";

export default function SimpleNavigationBar() {
  return (
    <Flex
      h="8vh"
      className="maximise-width"
      borderBottom="1px"
      borderColor="#d3d3d3"
    >
      <Text alignSelf="center" fontWeight="700" paddingLeft={8} fontSize={24}>
        Mendisphere
      </Text>
    </Flex>
  );
}
