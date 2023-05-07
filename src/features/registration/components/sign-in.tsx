import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";

export default function SignIn() {
  return (
    <Flex>
      <Spacer />
      <Box p="1">
        <Text color="grey" as="b">
          Already have an account?{" "}
        </Text>
      </Box>
      <Box p="1">
        <Link href="/login">
          <Text color="blue" as="b">
            Sign In
          </Text>
        </Link>
      </Box>
      <Spacer />
    </Flex>
  );
}
