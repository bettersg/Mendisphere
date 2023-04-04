import { Flex, Text } from "@chakra-ui/react";
import "../page-style.scss";

export default function SimpleNavigationBar() {
  return (
    <Flex
      h="8vh"
      className="maximise-width"
      borderBottom="1px"
      borderColor="#d3d3d3"
      // below settings to sticky this NavBar to top
      position="sticky"
      top={0}
      zIndex={200}
      backgroundColor="#FFFFFF"
    >
      <Text alignSelf="center" fontWeight="700" paddingLeft={8} fontSize={24}>
        Mendisphere
      </Text>
    </Flex>
  );
}
