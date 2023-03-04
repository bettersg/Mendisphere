import { Flex, Text } from "@chakra-ui/react";

export default function SimpleNavigationBar() {
  return (
    <Flex h="8vh" borderBottom="1px" borderColor="#d3d3d3">
      <Text alignSelf="center" fontWeight="700" paddingLeft={8} fontSize={24}>
        Mendisphere
      </Text>
    </Flex>
  );
}
