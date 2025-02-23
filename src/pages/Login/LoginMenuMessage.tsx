import { Box, Flex, VStack, Text } from "@chakra-ui/react";

export default function LoginMenuMessage() {
  return (
    <Flex>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="4xl">Welcome back 👋🏻</Text>
        </Box>
        <Box>
          <Text fontSize="" as="b">
            Connect with our community and get access to resources.
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
}
