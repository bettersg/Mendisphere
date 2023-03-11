import { Flex, Stack, Box, Image, Heading } from "@chakra-ui/react";
import NavigationButton from "./NavigationButton";

export default function FrontPage() {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      px={8}
      mb={16}
    >
      <Stack
        spacing={4}
        paddingTop="48px"
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size={["md", "lg", "xl", "3xl"]}
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          Mental Health resources should reach everyone.
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
          paddingBottom="20px"
        >
          Amplify the impact of your mental health initiatives through
          collaboration.
        </Heading>
        <NavigationButton
          size="md"
          height="48px"
          width="300px"
          borderRadius="18px"
          backgroundColor="#192873"
          navigationLink="/organisations"
          buttonText="View Organisations"
          _hover={{ bg: "#ebedf0" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(255, 255, 255, .5), 0 10px 10px rgba(0, 0, 0, .15)",
          }}
        />
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image src={require("../../../assets/images/3dcolleagues1.png")} />
      </Box>
    </Flex>
  );
}
