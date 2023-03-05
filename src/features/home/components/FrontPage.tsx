import {
  Flex,
  Center,
  Box,
  VStack,
  StackDivider,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import NavigationButton from "./NavigationButton";

export default function FrontPage() {
  return (
    <Flex minWidth="max-content">
      <Center w="8vw" h="89.7vh" />

      <Flex w="82.9vw" h="89.7vh">
        <VStack
          w="34.2vw"
          h="89.7vh"
          divider={<StackDivider borderColor="whiteAlpha.400" />}
          spacing={4}
          align="stretch"
        >
          <Box>
            <Text fontSize="7xl" as="b">
              Expand your impact with Mindbetter
            </Text>
          </Box>
          <Box>
            <Text fontSize="3xl">
              Connecting you to what you need most to help you go faster.
            </Text>
          </Box>

          <NavigationButton
            backgroundColor="#192873"
            navigationLink=""
            buttonText="Learn more"
            height="6vh"
            width="34.2vw"
          ></NavigationButton>
        </VStack>

        <Box w="7.7vw" h="89.7vh"></Box>

        <HStack w="41vw" h="89.7vh">
          <VStack
            w="19.3vw"
            h="89.7vh"
            divider={<StackDivider borderColor="whiteAlpha.400" />}
            spacing={4}
            align="stretch"
          >
            <Center w="19.3vw" h="25.4vh"></Center>

            <Center w="19.3vw" h="35.9vh">
              <Image src={require("../../../assets/images/homeIcon1.png")} />
            </Center>

            <Center w="19.3vw" h="28.4vh"></Center>
          </VStack>

          <Center w="2.4vw" h="89.7vh"></Center>

          <VStack
            w="19.3vw"
            h="89.7vh"
            divider={<StackDivider borderColor="whiteAlpha.400" />}
            spacing={4}
            align="stretch"
          >
            <Center w="19.3vw" h="5.2vh" />

            <Center w="19.3vw" h="35.9vh">
              <Image src={require("../../../assets/images/homeIcon0.png")} />
            </Center>

            <Center w="19.3vw" h="2.4vh" />

            <Center w="19.3vw" h="35.9vh">
              <Image src={require("../../../assets/images/homeIcon2.png")} />
            </Center>

            <Center w="19.3vw" h="10.3vh" />
          </VStack>
        </HStack>
      </Flex>

      <Center w="8vw" h="89.7vh" />
    </Flex>
  );
}
