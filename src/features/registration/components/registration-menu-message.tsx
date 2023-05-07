import { Box, Flex, VStack, Text } from "@chakra-ui/react";

export default function RegistrationMenuMessage() {
  return (
    <Flex>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="4xl">Get connected 🚀</Text>
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
