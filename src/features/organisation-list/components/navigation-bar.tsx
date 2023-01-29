import { VStack, StackDivider, Center, Flex, Text } from "@chakra-ui/react";
import { Component } from "react";

class NavigationBar extends Component {
  //TODO: Need to add another lifecycle method to prevent double requests in react

  render() {
    return (
      <VStack
        divider={<StackDivider borderColor="whiteAlpha.200" />}
        spacing={0}
        w="98vw"
        h="10vh"
      >
        <Center h="2.5vh" />

        <Center h="5vh">
          <Flex>
            <Center p="4" minW="5.33vw" h="5vh">
              <Text
                fontFamily={"Inter"}
                fontStyle={"normal"}
                fontSize={"24px"}
                lineHeight={"29px"}
                letterSpacing={"-0.015em"}
                color={"#000000"}
              >
                Mindbetter
              </Text>
            </Center>

            <Center w="14.9vw" h="5vh" />
            {/* TODO: Create a method to calculate relative value for width(vw) and height (vh)  */}
            <Center w="24vw" h="5vh">
              <Flex>
                <Center w="8vw" h="5vh"></Center>

                <Center w="8vw" h="5vh"></Center>

                <Center w="8vw" h="5vh"></Center>
              </Flex>
            </Center>

            <Center w="14.9vw" h="5vh" />

            <Center w="19.3vw" h="5vh">
              <Center w="1.2vw" h="5vh" />
            </Center>

            <Center w="8.8vw" h="5vh" />
          </Flex>
        </Center>
        <Center h="2.5vh" />
      </VStack>
    );
  }
}

export default NavigationBar;
