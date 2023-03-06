import {
  Flex,
  Center,
  Stack,
  Box,
  VStack,
  StackDivider,
  Text,
  HStack,
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NavigationButton from "./NavigationButton";

export default function FrontPage() {
  return (
    <Flex minWidth="max-content">
      <Center w="8vw" h="89.7vh" />
      <Flex w="82.9vw" h="89.7vh" direction={['column', 'column', 'row']}>
        <VStack
          w={['100%', '100%', '50%']}
          h="89.7vh"
          divider={<StackDivider borderColor="whiteAlpha.400" />}
          spacing={4}
          align="stretch"
        >
          <Wrap>
            <Text fontSize="7xl" as="b">
              Mental Health Resources Should Reach Everyone.
            </Text>
            <Text fontSize="3xl">
              Amplify the impact of your mental health initiatives through collaboration.
            </Text>
            <NavigationButton
              size='md'
              width='200px'
              borderRadius='18px'
              backgroundColor="#192873"
              navigationLink=""
              buttonText="View Organization"
              height="6vh"
              _hover={{ bg: '#ebedf0' }}
              _active={{
                bg: '#dddfe2',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
              }}
              _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(255, 255, 255, .5), 0 10px 10px rgba(0, 0, 0, .15)',
              }}
            ></NavigationButton>
          </Wrap>
        </VStack>
        <Wrap w={['100', '80%', '50%']} h="89.7vh">
          <WrapItem w="100%">
            <Image
              src={require("../../../assets/images/homeIcon1.png")}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </WrapItem>
        </Wrap>
      </Flex>
      <Center w="8vw" h="89.7vh" />
    </Flex>
  );
}
