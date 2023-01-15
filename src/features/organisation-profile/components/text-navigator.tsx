import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import "../scss/text-navigator.scss";

export default function TextNavigator() {
  return (
    <Flex className="textNavigatorBox">
      <Box className="textBox">
        <HStack spacing="15px">
          <img src={"./home.png"} alt="" />
          <ChevronRightIcon />
          <Text>Organisations</Text>
          <ChevronRightIcon />
          <Text>Resilience Collective (RC)</Text>
        </HStack>
      </Box>
    </Flex>
  );
}
